export default function CardReservationIcon({ big = false }: { big?: boolean }) {
  const size = big ? 78 : 55
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 78 78'
      fill='none'
      role='img'
      aria-label='Card Reservation icon'
    >
      <circle cx='39' cy='39' r='37.5' fill='#8B5CF6' stroke='#A78BFA' strokeWidth='3' />
      {/* Credit card */}
      <rect x='16' y='26' width='46' height='30' rx='4' fill='white' fillOpacity='0.9' />
      {/* Card stripe */}
      <rect x='16' y='33' width='46' height='8' fill='#8B5CF6' fillOpacity='0.8' />
      {/* Card chip */}
      <rect x='22' y='44' width='10' height='7' rx='1' fill='#F59E0B' fillOpacity='0.9' />
      <line x1='24' y1='44' x2='24' y2='51' stroke='#D97706' strokeWidth='0.5' />
      <line x1='27' y1='44' x2='27' y2='51' stroke='#D97706' strokeWidth='0.5' />
      <line x1='30' y1='44' x2='30' y2='51' stroke='#D97706' strokeWidth='0.5' />
      {/* Card number dots */}
      <circle cx='40' cy='50' r='1.5' fill='#8B5CF6' fillOpacity='0.5' />
      <circle cx='45' cy='50' r='1.5' fill='#8B5CF6' fillOpacity='0.5' />
      <circle cx='50' cy='50' r='1.5' fill='#8B5CF6' fillOpacity='0.5' />
      <circle cx='55' cy='50' r='1.5' fill='#8B5CF6' fillOpacity='0.5' />
      {/* Reservation badge */}
      <circle cx='56' cy='22' r='10' fill='#10B981' />
      <path
        d='M52 22L55 25L60 19'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
