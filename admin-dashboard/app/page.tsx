export const runtime = 'edge';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')) 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : 'https://dcqetxwnfkygbshmpnom.supabase.co'

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjcWV0eHduZmt5Z2JzaG1wbm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwNTMzMjUsImV4cCI6MjEwNDYyOTMyNX0.I5fggd2gAQ_amMS0jPSuzyzICAni8gs86y7G_0ZDSro'

const supabase = createClient(supabaseUrl, supabaseKey)

export const revalidate = 0 

export default async function AdminDashboard() {
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main style={{ padding: '30px', fontFamily: 'sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        Admin Dashboard - Airtime & Data Transactions
      </h1>

      {error && (
        <div style={{ padding: '10px', background: '#ffe6e6', color: '#d9534f', marginBottom: '20px', borderRadius: '5px' }}>
          Kuskure wajen janyo bayanai: {error.message}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#0070f3', color: '#fff' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Phone Number</th>
              <th style={{ padding: '12px' }}>Service</th>
              <th style={{ padding: '12px' }}>Network</th>
              <th style={{ padding: '12px' }}>Amount (₦)</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{tx.id}</td>
                  <td style={{ padding: '12px' }}>{tx.phone}</td>
                  <td style={{ padding: '12px' }}>{tx.service}</td>
                  <td style={{ padding: '12px' }}>{tx.network}</td>
                  <td style={{ padding: '12px' }}>₦{tx.amount}</td>
                  <td style={{ padding: '12px', color: tx.status === 'Success' ? 'green' : 'orange', fontWeight: 'bold' }}>
                    {tx.status}
                  </td>
                  <td style={{ padding: '12px' }}>{new Date(tx.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  No Transaction yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}