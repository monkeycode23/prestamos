



class ClientsService {


    
  async  getClients   (filter, limit = 5, page = 1)  {
  
  function filters(filter) {
    const array = []
    if(filter.nickname) {
      array.push(`clients.nickname LIKE '%${filter.nickname}%'`)
    }
    const payments = []
    if(filter.cuotas?.expired) {
      payments.push(`p.status = 'expired'`)
    }
    if(filter.cuotas?.incomplete) {
      payments.push(`p.status = 'incomplete'`)
    }
    if(filter.cuotas?.pending) {
      payments.push(`p.status = 'pending'`)
    }
    if(filter.cuotas?.paid) {
      payments.push(`p.status = 'paid'`)
    } 

    const paymentsStr = payments.join(" OR ")
    
    if(paymentsStr) array.push(paymentsStr)

    return array.join(" AND ")
  }

  const filterString = filters(filter)

  const select = `
  DISTINCT clients.*,

  -- Préstamos
  COUNT(DISTINCT l.id) AS total_loans,
  COUNT(DISTINCT CASE WHEN l.status = 'active' THEN l.id END) AS total_active_loans,
  COUNT(DISTINCT CASE WHEN l.status = 'completed' THEN l.id END) AS total_completed_loans,
  COUNT(DISTINCT CASE WHEN l.status = 'canceled' THEN l.id END) AS total_canceled_loans,

  -- Pagos
  COUNT(DISTINCT p.id) AS total_payments,
  COUNT(DISTINCT CASE WHEN p.status = 'paid' THEN p.id END) AS total_paid_payments,
  COUNT(DISTINCT CASE WHEN p.status = 'pending' THEN p.id END) AS total_pending_payments,
  COUNT(DISTINCT CASE WHEN p.status = 'expired' THEN p.id END) AS total_expired_payments,
  COUNT(DISTINCT CASE WHEN p.status = 'incomplete' THEN p.id END) AS total_incomplete_payments,

  -- Reputación calculada
  ROUND((
    SUM(
      CASE 
        WHEN p.status = 'paid' THEN 1.0
        WHEN p.status = 'pending' THEN 0.75
        WHEN p.status = 'incomplete' THEN 0.5
        WHEN p.status = 'expired' THEN 0.0
        ELSE 0
      END
    ) * 100.0 / NULLIF(COUNT(p.id), 0)
  ), 2) AS reputation
`;

  const query = {
    select: select,
    joins: `
      LEFT JOIN loans l ON clients.id = l.client_id
      LEFT JOIN payments p ON l.id = p.loan_id
    `,
    orderBy: `${!filter.nickname ? 'clients.id DESC' : ''}`,
    where: `${filterString.length > 0 ? filterString : "1=1"}`,
    limit: limit,
    offset: ((page - 1) * limit),
    groupBy: `clients.id`
  };

  const clients = await window.database.models.Clients.getClients(query)

  const totalQuery = {
    select: `COUNT(DISTINCT clients.id) as total`,
    joins: `
      LEFT JOIN loans l ON clients.id = l.client_id
      LEFT JOIN payments p ON l.id = p.loan_id
    `,
    where: `${filterString.length > 0 ? filterString : "1=1"}`
  }

  const totalClients = await window.database.models.Clients.getClients(totalQuery)
  
  return {
    clients,
    total: totalClients[0].total
  }
}
}