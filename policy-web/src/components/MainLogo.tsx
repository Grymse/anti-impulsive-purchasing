
export default function MainLogo() {
  return <div className="relative">
    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-lg animate-pulse"></div>
    <img
    src="/icon.png"
    alt="Extension Logo (On)"
    width={148}
    height={148}
    className="relative w-auto h-auto max-w-[200px] animation-breathe"
    />
  </div>
}