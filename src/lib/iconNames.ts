// Icon names editors can pick in the CMS. Rendered with lucide-react in components/Icon.tsx.
export const iconNames = [
  'Headset', 'MessagesSquare', 'LifeBuoy', 'PhoneOutgoing', 'Keyboard', 'Calculator', 'Users',
  'PackageCheck', 'Stethoscope', 'ShieldCheck', 'House', 'Scale', 'CodeXml', 'ServerCog', 'Bug',
  'ChartColumn', 'Megaphone', 'PenTool', 'Share2', 'CalendarCheck', 'Lock', 'Globe', 'Clock',
  'Award', 'Building2', 'Landmark', 'ShoppingCart', 'Plane', 'Truck', 'Cpu', 'HeartPulse',
  'Briefcase', 'GraduationCap', 'BadgeCheck', 'FileCheck2', 'Fingerprint', 'Gauge', 'Layers',
  'Workflow', 'Zap', 'Target', 'Handshake', 'UserCheck', 'ClipboardCheck', 'Database', 'CloudCog',
  'Wallet', 'Receipt', 'FileText', 'Bot', 'Languages', 'Network', 'Eye', 'Sparkles',
] as const

export type IconName = (typeof iconNames)[number]
