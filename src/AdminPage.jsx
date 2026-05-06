import { useEffect, useMemo, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  clearAdminToken,
  fetchAdminPayments,
  getAdminToken,
  loginAdmin,
  setAdminToken,
} from "./utils/adminApi";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
}

function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => getAdminToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState(null);

  const isLoggedIn = Boolean(token);

  const refreshDashboard = async (adminToken) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminPayments(adminToken);
      setDashboard(data);
    } catch (err) {
      const message = err.message || "Could not load payments";
      if (message.toLowerCase().includes("token")) {
        clearAdminToken();
        setToken("");
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshDashboard(token);
    }
  }, [isLoggedIn, token]);

  const payments = useMemo(() => dashboard?.payments || [], [dashboard]);
  const totals = dashboard?.totals;

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await loginAdmin({ username, password });
      setAdminToken(response.token);
      setToken(response.token);
      setPassword("");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setToken("");
    setDashboard(null);
    setError("");
  };

  return (
    <>
      <Header />
      <main className="container">
        <section className="card admin-card">
          <h2 className="admin-title">Admin Dashboard</h2>
          {!isLoggedIn ? (
            <form className="form" onSubmit={handleLogin}>
              <label className="field-label" htmlFor="admin-username">
                Username
              </label>
              <input
                id="admin-username"
                className="input"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Admin username"
                required
              />
              <label className="field-label" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                className="input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin password"
                required
              />
              {error && <div className="admin-error">{error}</div>}
              <button className="btn" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          ) : (
            <div className="form">
              <div className="admin-actions">
                <button className="btn admin-small-btn" onClick={() => refreshDashboard(token)}>
                  Refresh
                </button>
                <button className="btn admin-small-btn admin-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
              {error && <div className="admin-error">{error}</div>}
              {loading ? (
                <div className="admin-muted">Loading payments...</div>
              ) : (
                <>
                  <div className="admin-stats">
                    <div className="admin-stat-box">
                      <div className="admin-stat-label">Total Received</div>
                      <div className="admin-stat-value">{formatAmount(totals?.totalAmount)}</div>
                    </div>
                    <div className="admin-stat-box">
                      <div className="admin-stat-label">Total Payments</div>
                      <div className="admin-stat-value">{totals?.paymentCount || 0}</div>
                    </div>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Message</th>
                          <th>Payment ID</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="admin-muted">
                              No payments yet.
                            </td>
                          </tr>
                        ) : (
                          payments.map((payment) => (
                            <tr key={payment.id}>
                              <td>{payment.name || "Anonymous"}</td>
                              <td>{formatAmount(payment.amount)}</td>
                              <td>{payment.message || "-"}</td>
                              <td className="admin-code">{payment.razorpayPaymentId}</td>
                              <td>{new Date(payment.verifiedAt).toLocaleString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AdminPage;
