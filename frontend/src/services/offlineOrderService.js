const STORAGE_KEY = 'gatherpoint_offline_orders';

function readQueue() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isOnline() {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

export function getPendingOfflineOrders() {
  return readQueue();
}

export function getPendingCount() {
  return readQueue().length;
}

export function saveOfflineOrder(orderPayload) {
  const queue = readQueue();
  const entry = {
    localId: `offline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
    ...orderPayload,
  };
  queue.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  return entry;
}

export function removeOfflineOrder(localId) {
  const queue = readQueue().filter((o) => o.localId !== localId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  return queue;
}

export function clearSyncedOrders(localIds) {
  const idSet = new Set(localIds);
  const queue = readQueue().filter((o) => !idSet.has(o.localId));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  return queue;
}

export function buildOrderPayload({ cart, subtotal, tax, total, tableId, customerName, paymentMethod, employeeId }) {
  return {
    offlineReference: `offline-${Date.now()}`,
    offline: true,
    status: 'PAID',
    subtotal,
    tax,
    discount: 0,
    total,
    customerName: customerName || 'Walk-in',
    paymentMethod,
    employeeId,
    table: tableId ? { id: tableId } : null,
    items: cart.map((item) => ({
      quantity: item.qty,
      unitPrice: item.price,
      totalPrice: item.price * item.qty,
      product: { id: item.id },
    })),
  };
}

export function toSyncPayload(offlineEntry) {
  const { localId, savedAt, customerName, paymentMethod, employeeId, ...order } = offlineEntry;
  return {
    ...order,
    offlineReference: order.offlineReference || localId,
    offline: true,
  };
}
