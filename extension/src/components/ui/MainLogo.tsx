import IconSrc from "data-base64:~assets/icon.png"
import IconOffSrc from "data-base64:~assets/icon-off.png"

type Props = {size: number, active: boolean};

export default function MainLogo({size, active}: Props) {
  if (active) {
    return <div className="relative">
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-lg animate-pulse"></div>
      <img
      src={IconSrc}
      alt="Extension Logo (On)"
      width={size}
      height={size}
      className="relative w-auto h-auto max-w-[200px] animation-breathe"
      />
    </div>
  }

  return <div className="relative">
    <img
    src={IconOffSrc}
    alt="Extension Logo (Off)"
    width={size}
    height={size}
    className="relative w-auto h-auto max-w-[200px] scale-75 transform opacity-80"
    />
  </div>
}