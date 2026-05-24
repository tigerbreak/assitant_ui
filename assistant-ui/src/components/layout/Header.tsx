interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  )
}
