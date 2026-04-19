import { Route, Routes, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FiArrowRight, FiUsers, FiBarChart2, FiLayers } from "react-icons/fi";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import ParticipantPage from "./pages/ParticipantPage";
import LoginPage from "./pages/LoginPage";

const features = [
  {
    icon: FiLayers,
    title: "계층 구조 설계",
    desc: "목표 → 기준 → 대안의 체계적 AHP 계층을 직관적으로 설계합니다.",
  },
  {
    icon: FiUsers,
    title: "참여자 설문",
    desc: "쌍대비교 설문으로 다수 전문가의 판단을 수집하고 집계합니다.",
  },
  {
    icon: FiBarChart2,
    title: "우선순위 도출",
    desc: "일관성 검증을 거쳐 신뢰할 수 있는 가중치와 우선순위를 제시합니다.",
  },
];

const steps = [
  {
    index: "STEP 01",
    title: "계층 설계",
    desc: "의사결정 목표, 평가 기준, 대안을 계층 구조로 정의합니다.",
  },
  {
    index: "STEP 02",
    title: "쌍대비교 설문",
    desc: "참여자 코드를 배포하고 기준 간 상대적 중요도를 수집합니다.",
  },
  {
    index: "STEP 03",
    title: "결과 분석",
    desc: "기하평균 집계와 일관성 검증을 통해 최종 우선순위를 도출합니다.",
  },
];

const HomeContent = () => (
  <Box className="landing-shell">
    {/* Background decoration */}
    <Box className="landing-bg" aria-hidden>
      <Box className="landing-grid" />
      <Box className="landing-orb landing-orb--cyan" />
      <Box className="landing-orb landing-orb--magenta" />
      <Box className="landing-orb landing-orb--indigo" />
    </Box>

    {/* Hero */}
    <Box className="landing-content">
      <Box className="landing-eyebrow">AHP 의사결정 설문 플랫폼</Box>

      <h1 className="landing-title">
        데이터 기반 의사결정,{" "}
        <span className="landing-highlight">체계적 우선순위</span>
      </h1>

      <p className="landing-subtitle">
        분석적 계층 프로세스(AHP)로 복잡한 의사결정을 명확하게 정렬합니다.
        전문가 집단의 판단을 수집하고, 일관성을 검증하며, 신뢰할 수 있는 우선순위를 도출합니다.
      </p>

      <Stack direction={{ xs: "column", sm: "row" }} className="landing-cta-row">
        <Button
          component={Link}
          to="/admin"
          variant="contained"
          size="large"
          endIcon={<FiArrowRight size={16} />}
          sx={{
            bgcolor: "var(--color-primary)",
            color: "#ffffff",
            fontWeight: 700,
            px: 3.5,
            py: 1.3,
            fontFamily: "var(--font-family)",
            fontSize: "0.95rem",
            borderRadius: 999,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "var(--color-primary-light)",
              boxShadow: "var(--shadow-md)",
            },
          }}
        >
          관리자 콘솔
        </Button>
        <Button
          component={Link}
          to="/participant"
          variant="outlined"
          size="large"
          sx={{
            color: "var(--landing-hl-color)",
            borderColor: "var(--landing-border)",
            fontWeight: 600,
            px: 3,
            py: 1.3,
            fontFamily: "var(--font-family)",
            fontSize: "0.95rem",
            borderRadius: 999,
            bgcolor: "var(--landing-surface)",
            backdropFilter: "blur(4px)",
            "&:hover": {
              borderColor: "var(--color-primary)",
              bgcolor: "var(--color-primary-pale)",
            },
          }}
        >
          설문 참여하기
        </Button>
      </Stack>
    </Box>

    {/* Stats strip */}
    <Box className="landing-trust-strip">
      {[
        { kicker: "의사결정 방법론", value: "AHP", note: "Analytic Hierarchy Process" },
        { kicker: "일관성 검증", value: "CR ≤ 0.1", note: "Saaty 일관성 기준" },
        { kicker: "집계 방식", value: "기하평균", note: "다수 응답자 집계" },
      ].map((s) => (
        <Box key={s.kicker} className="landing-stat">
          <p className="landing-stat-kicker">{s.kicker}</p>
          <p className="landing-stat-value">{s.value}</p>
          <p className="landing-stat-note">{s.note}</p>
        </Box>
      ))}
    </Box>

    {/* Feature grid */}
    <Box className="landing-feature-grid">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <Box key={f.title} className="landing-feature-card">
            <Box className="landing-feature-icon">
              <Icon size={18} aria-hidden />
            </Box>
            <p className="landing-feature-title">{f.title}</p>
            <p className="landing-feature-copy">{f.desc}</p>
          </Box>
        );
      })}
    </Box>

    {/* Workflow */}
    <Box className="landing-workflow">
      <p className="landing-workflow-kicker">워크플로우</p>
      <p className="landing-workflow-title">3단계로 완성하는 과학적 의사결정</p>
      <Box className="landing-steps">
        {steps.map((s) => (
          <Box key={s.index} className="landing-step">
            <p className="landing-step-index">{s.index}</p>
            <p className="landing-step-title">{s.title}</p>
            <p className="landing-step-copy">{s.desc}</p>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout><HomeContent /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/participant" element={<ParticipantPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
