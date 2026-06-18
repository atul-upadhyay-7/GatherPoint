export const demoCategories = [
  { id: 1, name: 'Beverages', icon: '☕' },
  { id: 2, name: 'Starters', icon: '🥗' },
  { id: 3, name: 'Mains', icon: '🍝' },
  { id: 4, name: 'Desserts', icon: '🍰' },
  { id: 5, name: 'Specials', icon: '⭐' },
];

export const demoProducts = [
  { id: 1, productName: 'Cappuccino', price: 180, categoryId: 1, image: '☕', available: true },
  { id: 2, productName: 'Espresso', price: 120, categoryId: 1, image: '☕', available: true },
  { id: 3, productName: 'Iced Latte', price: 220, categoryId: 1, image: '🧊', available: true },
  { id: 4, productName: 'Fresh Orange Juice', price: 150, categoryId: 1, image: '🍊', available: true },
  { id: 5, productName: 'Caesar Salad', price: 320, categoryId: 2, image: '🥗', available: true },
  { id: 6, productName: 'Bruschetta', price: 280, categoryId: 2, image: '🍞', available: true },
  { id: 7, productName: 'Soup of the Day', price: 240, categoryId: 2, image: '🍲', available: true },
  { id: 8, productName: 'Grilled Salmon', price: 680, categoryId: 3, image: '🐟', available: true },
  { id: 9, productName: 'Pasta Alfredo', price: 520, categoryId: 3, image: '🍝', available: true },
  { id: 10, productName: 'Chicken Steak', price: 580, categoryId: 3, image: '🥩', available: true },
  { id: 11, productName: 'Margherita Pizza', price: 450, categoryId: 3, image: '🍕', available: true },
  { id: 12, productName: 'Chocolate Lava Cake', price: 320, categoryId: 4, image: '🍫', available: true },
  { id: 13, productName: 'Tiramisu', price: 280, categoryId: 4, image: '🍰', available: true },
  { id: 14, productName: 'Chef Special Platter', price: 890, categoryId: 5, image: '⭐', available: true },
  { id: 15, productName: 'Truffle Risotto', price: 750, categoryId: 5, image: '🍚', available: false },
];

export const demoTables = [
  { id: 1, tableNumber: 'T1', seats: 2, status: 'available', floor: 'Ground Floor' },
  { id: 2, tableNumber: 'T2', seats: 4, status: 'occupied', floor: 'Ground Floor' },
  { id: 3, tableNumber: 'T3', seats: 4, status: 'available', floor: 'Ground Floor' },
  { id: 4, tableNumber: 'T4', seats: 6, status: 'reserved', floor: 'Ground Floor' },
  { id: 5, tableNumber: 'T5', seats: 4, status: 'occupied', floor: 'First Floor' },
  { id: 6, tableNumber: 'T6', seats: 2, status: 'available', floor: 'First Floor' },
  { id: 7, tableNumber: 'T7', seats: 8, status: 'available', floor: 'First Floor' },
  { id: 8, tableNumber: 'T8', seats: 4, status: 'available', floor: 'Terrace' },
];

export const demoCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', visits: 12, spent: 8450 },
  { id: 2, name: 'Sarah Miller', email: 'sarah.m@gmail.com', phone: '+91 87654 32109', visits: 8, spent: 5200 },
  { id: 3, name: 'Raj Patel', email: 'raj.p@outlook.com', phone: '+91 76543 21098', visits: 15, spent: 12300 },
  { id: 4, name: 'Emily Chen', email: 'emily.chen@gmail.com', phone: '+91 65432 10987', visits: 3, spent: 2100 },
  { id: 5, name: 'Michael Brown', email: 'm.brown@yahoo.com', phone: '+91 54321 09876', visits: 6, spent: 4800 },
];

export const demoOrders = [
  {
    id: 1,
    orderNumber: 'ORD-2026-0142',
    createdAt: '2026-06-14T12:30:00',
    status: 'PAID',
    subtotal: 980,
    tax: 49,
    discount: 0,
    total: 1029,
    table: { tableNumber: 'T5' },
    customer: { name: 'John Doe', email: 'john@example.com' },
    employee: { name: 'Clerk User' },
    items: [
      { quantity: 2, totalPrice: 360, product: { productName: 'Cappuccino', price: 180 } },
      { quantity: 1, totalPrice: 520, product: { productName: 'Pasta Alfredo', price: 520 } },
      { quantity: 1, totalPrice: 100, product: { productName: 'Garlic Bread', price: 100 } },
    ],
  },
  {
    id: 2,
    orderNumber: 'ORD-2026-0141',
    createdAt: '2026-06-14T11:45:00',
    status: 'PAID',
    subtotal: 680,
    tax: 34,
    discount: 50,
    total: 664,
    table: { tableNumber: 'T2' },
    customer: { name: 'Sarah Miller', email: 'sarah.m@gmail.com' },
    employee: { name: 'Clerk User' },
    items: [
      { quantity: 1, totalPrice: 680, product: { productName: 'Grilled Salmon', price: 680 } },
    ],
  },
  {
    id: 3,
    orderNumber: 'ORD-2026-0140',
    createdAt: '2026-06-14T10:15:00',
    status: 'DRAFT',
    subtotal: 450,
    tax: 22.5,
    discount: 0,
    total: 472.5,
    table: { tableNumber: 'T8' },
    customer: { name: 'Walk-in', email: '' },
    employee: { name: 'Clerk User' },
    items: [
      { quantity: 1, totalPrice: 450, product: { productName: 'Margherita Pizza', price: 450 } },
    ],
  },
  {
    id: 4,
    orderNumber: 'ORD-2026-0139',
    createdAt: '2026-06-13T20:30:00',
    status: 'PAID',
    subtotal: 1240,
    tax: 62,
    discount: 100,
    total: 1202,
    table: { tableNumber: 'T7' },
    customer: { name: 'Raj Patel', email: 'raj.p@outlook.com' },
    employee: { name: 'Clerk User' },
    items: [
      { quantity: 1, totalPrice: 890, product: { productName: 'Chef Special Platter', price: 890 } },
      { quantity: 2, totalPrice: 350, product: { productName: 'Tiramisu', price: 175 } },
    ],
  },
  {
    id: 5,
    orderNumber: 'ORD-2026-0138',
    createdAt: '2026-06-13T19:00:00',
    status: 'CANCELLED',
    subtotal: 320,
    tax: 16,
    discount: 0,
    total: 336,
    table: { tableNumber: 'T3' },
    customer: { name: 'Emily Chen', email: 'emily.chen@gmail.com' },
    employee: { name: 'Clerk User' },
    items: [
      { quantity: 1, totalPrice: 320, product: { productName: 'Chocolate Lava Cake', price: 320 } },
    ],
  },
];

export const demoKitchenTickets = [
  {
    id: 1,
    orderNumber: 'ORD-2026-0142',
    stage: 'TO_COOK',
    tableNumber: 'T5',
    createdAt: '2026-06-14T12:30:00',
    items: [
      { id: 1, quantity: 2, productName: 'Cappuccino', categoryName: 'Beverages', completed: false },
      { id: 2, quantity: 1, productName: 'Pasta Alfredo', categoryName: 'Mains', completed: false },
    ],
  },
  {
    id: 2,
    orderNumber: 'ORD-2026-0140',
    stage: 'PREPARING',
    tableNumber: 'T8',
    createdAt: '2026-06-14T10:15:00',
    items: [
      { id: 3, quantity: 1, productName: 'Margherita Pizza', categoryName: 'Mains', completed: false },
    ],
  },
  {
    id: 3,
    orderNumber: 'ORD-2026-0137',
    stage: 'COMPLETED',
    tableNumber: 'T1',
    createdAt: '2026-06-14T09:45:00',
    items: [
      { id: 4, quantity: 2, productName: 'Espresso', categoryName: 'Beverages', completed: true },
      { id: 5, quantity: 1, productName: 'Caesar Salad', categoryName: 'Starters', completed: true },
    ],
  },
];

export const demoSession = {
  id: 5,
  openedAt: '2026-06-14T08:00:00',
  closedAt: null,
  openingAmount: 2000,
  closingAmount: null,
  totalSales: 12450,
  orderCount: 18,
  employee: { name: 'Clerk User' },
};

export const demoSessionHistory = [
  {
    id: 4,
    openedAt: '2026-06-13T08:00:00',
    closedAt: '2026-06-13T22:30:00',
    openingAmount: 2000,
    closingAmount: 18500,
    totalSales: 16500,
    orderCount: 42,
    employee: { name: 'Clerk User' },
  },
  {
    id: 3,
    openedAt: '2026-06-12T08:00:00',
    closedAt: '2026-06-12T23:00:00',
    openingAmount: 2000,
    closingAmount: 15200,
    totalSales: 13200,
    orderCount: 35,
    employee: { name: 'Jane Staff' },
  },
];

export const demoReportStats = {
  today: {
    totalRevenue: 12450,
    orderCount: 18,
    averageOrderValue: 691.67,
    customerCount: 14,
    topProducts: [
      { name: 'Cappuccino', quantity: 24, revenue: 4320 },
      { name: 'Pasta Alfredo', quantity: 12, revenue: 6240 },
      { name: 'Grilled Salmon', quantity: 8, revenue: 5440 },
      { name: 'Margherita Pizza', quantity: 10, revenue: 4500 },
      { name: 'Chef Special Platter', quantity: 5, revenue: 4450 },
    ],
    paymentBreakdown: { CASH: 4200, CARD: 5100, UPI: 3150 },
    hourlySales: [
      { hour: '8AM', amount: 800 },
      { hour: '9AM', amount: 1200 },
      { hour: '10AM', amount: 950 },
      { hour: '11AM', amount: 1400 },
      { hour: '12PM', amount: 2100 },
      { hour: '1PM', amount: 1800 },
      { hour: '2PM', amount: 1100 },
      { hour: '3PM', amount: 900 },
      { hour: '4PM', amount: 750 },
      { hour: '5PM', amount: 1450 },
    ],
  },
  week: {
    totalRevenue: 78400,
    orderCount: 112,
    averageOrderValue: 700,
    customerCount: 86,
    topProducts: [
      { name: 'Cappuccino', quantity: 145, revenue: 26100 },
      { name: 'Grilled Salmon', quantity: 42, revenue: 28560 },
      { name: 'Pasta Alfredo', quantity: 58, revenue: 30160 },
    ],
    paymentBreakdown: { CASH: 28000, CARD: 32000, UPI: 18400 },
    hourlySales: [],
  },
  month: {
    totalRevenue: 312000,
    orderCount: 445,
    averageOrderValue: 701.12,
    customerCount: 320,
    topProducts: [
      { name: 'Cappuccino', quantity: 580, revenue: 104400 },
      { name: 'Chef Special Platter', quantity: 95, revenue: 84550 },
      { name: 'Grilled Salmon', quantity: 168, revenue: 114240 },
    ],
    paymentBreakdown: { CASH: 112000, CARD: 128000, UPI: 72000 },
    hourlySales: [],
  },
};

export const demoStaff = [
  { id: 1, name: 'Clerk User', email: 'clerk@gatherpoint.com', role: 'EMPLOYEE', active: true, joinedAt: '2025-01-15', allowOfflineSelling: true },
  { id: 2, name: 'Jane Staff', email: 'jane@gatherpoint.com', role: 'EMPLOYEE', active: true, joinedAt: '2024-11-20', allowOfflineSelling: true },
  { id: 3, name: 'Chef Marco', email: 'marco@gatherpoint.com', role: 'KITCHEN_STAFF', active: true, joinedAt: '2024-08-10', allowOfflineSelling: false },
  { id: 4, name: 'Admin User', email: 'admin@gatherpoint.com', role: 'ADMIN', active: true, joinedAt: '2024-06-01', allowOfflineSelling: true },
  { id: 5, name: 'Tom Wilson', email: 'tom@gatherpoint.com', role: 'EMPLOYEE', active: false, joinedAt: '2025-03-01', allowOfflineSelling: false },
];

export const demoPromotions = [
  { id: 1, name: 'Happy Hour 20% Off', type: 'ORDER', discount: 20, discountType: 'PERCENTAGE', active: true, validUntil: '2026-07-31' },
  { id: 2, name: 'Free Dessert on ₹500+', type: 'ORDER', discount: 0, discountType: 'FLAT', active: true, validUntil: '2026-08-15' },
  { id: 3, name: 'Weekend Brunch Special', type: 'PRODUCT', discount: 15, discountType: 'PERCENTAGE', active: false, validUntil: '2026-06-30' },
];

export const demoFloors = [
  { id: 1, name: 'Ground Floor', tableCount: 4 },
  { id: 2, name: 'First Floor', tableCount: 3 },
  { id: 3, name: 'Terrace', tableCount: 1 },
];

export const demoPosStats = {
  todaySales: 12450,
  todayOrders: 18,
  activeTables: 3,
  pendingOrders: 2,
};
