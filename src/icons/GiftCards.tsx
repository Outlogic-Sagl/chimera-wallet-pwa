export default function GiftCardsIcon({ big = false }: { big?: boolean }) {
  const size = big ? 78 : 55
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 78 78'
      fill='none'
      role='img'
      aria-label='Gift Cards icon'
    >
      <circle cx='39' cy='39' r='37.5' fill='#EC4899' stroke='#F472B6' strokeWidth='3' />
      {/* Gift box body */}
      <rect x='22' y='38' width='34' height='22' rx='3' fill='white' fillOpacity='0.9' />
      {/* Gift box lid */}
      <rect x='20' y='32' width='38' height='8' rx='2' fill='white' fillOpacity='0.95' />
      {/* Vertical ribbon */}
      <rect x='36' y='32' width='6' height='28' fill='#EC4899' fillOpacity='0.8' />
      {/* Horizontal ribbon */}
      <rect x='22' y='44' width='34' height='6' fill='#EC4899' fillOpacity='0.8' />
      {/* Bow */}
      <ellipse cx='39' cy='28' rx='8' ry='6' fill='#EC4899' />
      <ellipse cx='39' cy='28' rx='3' ry='2' fill='white' fillOpacity='0.5' />
      <path
        d='M31 28C31 28 35 24 39 28C43 24 47 28 47 28'
        stroke='#BE185D'
        strokeWidth='2'
        strokeLinecap='round'
        fill='none'
      />
    </svg>
  )
}
