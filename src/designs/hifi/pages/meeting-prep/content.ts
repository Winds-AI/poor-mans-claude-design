/** Shared copy + theme for meeting-prep hi-fi variants (APB Sales AI–aligned). */
export const MP_THEME = {
  bg: '#F8F9FA',
  green: '#004B28',
  greenMuted: '#E8F5E9',
  border: '#E8EAED',
  shadow: '0 2px 16px rgba(15, 23, 42, 0.06)',
  shadowSm: '0 1px 8px rgba(15, 23, 42, 0.05)',
} as const

export const meetingTabs = ['Meeting Preparation', 'Outlet Snapshot', 'Meeting Notes'] as const

export const meetingPrepCopy = {
  outletName: 'Café de Jaren',
  when: 'Today, 2:30 PM',
  /** Shown large next to the calendar cell (outlet detail screen). */
  visitTime: '2:30 PM',
  where: 'Amsterdam Centrum',
  contactName: 'Marco van Berg',
  contactPhone: '+31 20 555 0123',
  dateBadge: '22 APR',
  meetingLabel: 'Store visit',
  tier: 'Gold',
  customerSince: '2019',
  seats: '~120 seats',
  hours: '10:00–02:00',
  objectives: [
    'Confirm Q3 volume commitment and promo mix',
    'Introduce Heineken Silver placement and draft line check',
    'Agree next visit date and follow-up owner for 0.0 trial',
  ],
  prepItems: [
    'Latest sell-out and margin one-pager',
    'UEFA promo deck + draft winter calendar',
    'Order history export (last 90 days) and draft proposal PDF',
  ],
} as const
