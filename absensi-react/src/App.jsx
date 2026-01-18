import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [dark, setDark] = useState(false);
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [status, setStatus] = useState("");
  const [hasil, setHasil] = useState("");

  function waktuWIB() {
    const now = new Date();
    let jam = now.getHours();
    const menit = String(now.getMinutes()).padStart(2, "0");
    const ampm = jam >= 12 ? "PM" : "AM";
    jam = jam % 12 || 12;
    return `${jam}.${menit} ${ampm} WIB`;
  }

  function submit() {
    if (!nama || nim.length !== 8 || !jurusan || !status) {
      setHasil(" Data belum lengkap / NIM harus 8 digit");
      return;
    }

    setHasil(
      `✓ ${nama} (${nim}) - ${jurusan}\nStatus: ${status}\nPukul: ${waktuWIB()}`
    );
  }

  const bg = dark
    ? "linear-gradient(135deg, #0a0a0a, #1a1a2e)"
    : "linear-gradient(135deg, #f5f7fa, #c3cfe2)";

  const cardBg = dark ? "rgba(26, 26, 46, 0.9)" : "rgba(255, 255, 255, 0.9)";
  const text = dark ? "#e8eaed" : "#1f2937";
  const inputBg = dark ? "rgba(51, 51, 77, 0.5)" : "rgba(255, 255, 255, 0.7)";
  const inputBorder = dark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)";

  return (
    <div style={{ ...styles.container, background: bg, color: text }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ ...styles.card, background: cardBg }}
      >
        <div style={styles.header}>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' }}>
             Absensi Mahasiswa
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDark(!dark)}
            style={styles.toggle}
          >
            {dark ? "☀️" : "🌙"}
          </motion.button>
        </div>

        <div style={styles.form}>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: dark ? "rgba(99, 102, 241, 0.6)" : "rgba(99, 102, 241, 0.5)" }}
            transition={{ duration: 0.2 }}
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={{ ...styles.input, background: inputBg, borderColor: inputBorder, color: text }}
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: dark ? "rgba(99, 102, 241, 0.6)" : "rgba(99, 102, 241, 0.5)" }}
            transition={{ duration: 0.2 }}
            placeholder="NIM (8 digit)"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            style={{ ...styles.input, background: inputBg, borderColor: inputBorder, color: text }}
          />
          <motion.select
            whileFocus={{ scale: 1.02, borderColor: dark ? "rgba(99, 102, 241, 0.6)" : "rgba(99, 102, 241, 0.5)" }}
            transition={{ duration: 0.2 }}
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            style={{ ...styles.input, background: inputBg, borderColor: inputBorder, color: text }}
          >
            <option value="">-- Pilih Jurusan --</option>
            <optgroup label="S1">
              <option value="S1 - Informatika">Informatika</option>
              <option value="S1 - Manajemen">Manajemen</option>
              <option value="S1 - DKV">DKV</option>
              <option value="S1 - Hukum">Hukum</option>
              <option value="S1 - Akuntansi">Akuntansi</option>
              <option value="S1 - Teknik Industri">Teknik Industri</option>
            </optgroup>
            <optgroup label="S2">
              <option value="S2 - Manajemen Inovasi">Manajemen Inovasi</option>
            </optgroup>
            <optgroup label="D3">
              <option value="D3 - Manajemen Perusahaan">Manajemen Perusahaan</option>
              <option value="D3 - Manajemen Informatika">Manajemen Informatika</option>
              <option value="D3 - Akuntansi">Akuntansi</option>
            </optgroup>
          </motion.select>

          <motion.select
            whileFocus={{ scale: 1.02, borderColor: dark ? "rgba(99, 102, 241, 0.6)" : "rgba(99, 102, 241, 0.5)" }}
            transition={{ duration: 0.2 }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ ...styles.input, background: inputBg, borderColor: inputBorder, color: text }}
          >
            <option value="">-- Pilih Status --</option>
            <option value="Hadir">Hadir</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
          </motion.select>

          <motion.button
            whileHover={{ scale: 1.03, y: -2, boxShadow: "0 12px 24px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={styles.button}
            onClick={submit}
          >
            Simpan Absensi
          </motion.button>
        </div>

        {hasil && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.result}
          >
            {hasil}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
  },
  card: {
    width: 440,
    padding: 36,
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(20px)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  toggle: {
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    width: 48,
    height: 48,
    borderRadius: 14,
    cursor: "pointer",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 14px rgba(102, 126, 234, 0.4)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  input: {
    padding: "14px 16px",
    borderRadius: 12,
    border: "2px solid",
    outline: "none",
    fontSize: 15,
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
  button: {
    marginTop: 12,
    padding: "16px 24px",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 16,
    letterSpacing: '0.3px',
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
  },
  result: {
    marginTop: 24,
    padding: 20,
    borderRadius: 14,
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))",
    border: "2px solid rgba(102, 126, 234, 0.2)",
    whiteSpace: "pre-line",
    fontSize: 15,
    lineHeight: 1.7,
    fontWeight: 500,
  },
};