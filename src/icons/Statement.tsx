export default function StatementIcon({ big = false }: { big?: boolean }) {
  const size = big ? 78 : 55
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 78 78'
      fill='none'
      role='img'
      aria-label='Statement icon'
    >
      <circle cx='39' cy='39' r='37.5' fill='#1F3BDB' stroke='#3B5AE8' strokeWidth='3' />
      <path
        d='M24 22C24 20.8954 24.8954 20 26 20H52C53.1046 20 54 20.8954 54 22V56C54 57.1046 53.1046 58 52 58H26C24.8954 58 24 57.1046 24 56V22Z'
        fill='white'
        fillOpacity='0.9'
      />
      <rect x='29' y='26' width='20' height='3' rx='1.5' fill='#1F3BDB' />
      <rect x='29' y='33' width='16' height='2' rx='1' fill='#1F3BDB' fillOpacity='0.6' />
      <rect x='29' y='39' width='18' height='2' rx='1' fill='#1F3BDB' fillOpacity='0.6' />
      <rect x='29' y='45' width='14' height='2' rx='1' fill='#1F3BDB' fillOpacity='0.6' />
      <rect x='29' y='51' width='16' height='2' rx='1' fill='#1F3BDB' fillOpacity='0.6' />
    </svg>
  )
}
