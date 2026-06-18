import { useNavigate } from 'react-router-dom';
import Logo from './customer/Logo';

export default function OAuth2ErrorPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 60% 40%, #0d1f15 0%, #020403 70%)" }}
    >
      {/* Decorative rings */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0"
        style={{ width: 600, height: 600, border: "1px solid rgba(212,175,55,0.07)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0"
        style={{ width: 900, height: 900, border: "1px solid rgba(212,175,55,0.04)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md text-center px-6">
        <div
          className="p-4 rounded-full"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <Logo className="w-16 h-16" />
        </div>

        <div className="space-y-2">
          <h1
            className="text-3xl font-bold tracking-[0.15em] uppercase"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(135deg, #FFF2B2, #D4AF37, #8A6623)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Access Denied
          </h1>
          <p className="text-white/50 text-sm tracking-wide leading-relaxed">
            This portal is for authorised staff only.
            <br />
            It looks like you're a customer — head over to our
            <br />
            customer page to explore the menu and place orders!
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #AA7C11)",
              color: "#020403",
              boxShadow: "0 4px 20px rgba(212,175,55,0.25)",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Go to Customer Page
          </button>
          <button
            onClick={() => navigate('/staff-pos')}
            className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 border cursor-pointer"
            style={{
              borderColor: "rgba(212,175,55,0.3)",
              color: "rgba(212,175,55,0.8)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.6)";
              e.currentTarget.style.background = "rgba(212,175,55,0.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Staff Login
          </button>
        </div>
      </div>
    </div>
  );
}
