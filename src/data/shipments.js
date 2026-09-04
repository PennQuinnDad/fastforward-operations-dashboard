export const shipments = [
  {
    id: 'FF-48291', status: 'Delayed', tone: 'red', priority: 'High', customer: 'Northstar Foods', origin: 'Chicago, IL', destination: 'Dallas, TX', location: 'Fort Worth, TX', eta: 'Sep 05, 2026', carrier: 'Apex Freight', service: 'Temperature-controlled', weight: '18,420 lb', pieces: '24 pallets', booked: 'Aug 31, 2026', issue: 'Missed delivery window', owner: 'M. Chen', lastUpdate: '2 hours ago', progress: 68,
  },
  {
    id: 'FF-48176', status: 'Exception', tone: 'amber', priority: 'Medium', customer: 'Meridian Components', origin: 'Rotterdam, NL', destination: 'Newark, NJ', location: 'Port of Newark, NJ', eta: 'Sep 06, 2026', carrier: 'BlueWater Lines', service: 'Ocean / expedited', weight: '7,850 lb', pieces: '12 crates', booked: 'Aug 28, 2026', issue: 'Customs documentation', owner: 'A. Patel', lastUpdate: '5 hours ago', progress: 54,
  },
  {
    id: 'FF-48043', status: 'In transit', tone: 'blue', priority: 'High', customer: 'Summit Medical', origin: 'Fresno, CA', destination: 'Denver, CO', location: 'Grand Junction, CO', eta: 'Sep 04, 2026', carrier: 'Apex Freight', service: 'Priority ground', weight: '3,280 lb', pieces: '8 pallets', booked: 'Sep 01, 2026', issue: 'Temperature variance', owner: 'J. Lewis', lastUpdate: 'Yesterday', progress: 82,
  },
  {
    id: 'FF-47988', status: 'In transit', tone: 'blue', priority: 'Low', customer: 'Harbor & Pine', origin: 'Atlanta, GA', destination: 'Miami, FL', location: 'Orlando, FL', eta: 'Sep 05, 2026', carrier: 'Southern Star', service: 'Standard ground', weight: '1,940 lb', pieces: '4 pallets', booked: 'Sep 02, 2026', issue: null, owner: 'Unassigned', lastUpdate: 'Yesterday', progress: 61,
  },
  {
    id: 'FF-47812', status: 'Delivered', tone: 'green', priority: 'Low', customer: 'Cedar Retail Group', origin: 'Seattle, WA', destination: 'Portland, OR', location: 'Portland, OR', eta: 'Sep 03, 2026', carrier: 'Northline', service: 'Standard ground', weight: '890 lb', pieces: '2 pallets', booked: 'Sep 01, 2026', issue: null, owner: 'R. Gomez', lastUpdate: 'Yesterday', progress: 100,
  },
]

export function getShipment(id) {
  return shipments.find((shipment) => shipment.id === id)
}