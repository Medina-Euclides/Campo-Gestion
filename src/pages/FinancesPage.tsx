/**
 * pagina donde se renderizan los componentes finanzas
 */

import { DollarSign, PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { FinancialSummary } from "../components/finances/FinancialSumary";

export function FinancesPage() {
    return(
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
          title="Balance tolal"
          value="$24000"
          change="+15% desd el mes pasado"
          icon={<DollarSign size={20}/>}
          />

          <StatCard
          title="Ingresos Totales"
          value="$24000"
          valueClassName="text-green-500"
          change="+15% desd el mes pasado"
          icon={<TrendingUp size={20}/>}
          />

          <StatCard
          title="Egresos tolales"
          value="$24000"
          valueClassName="text-red-500"
          change="+15% desd el mes pasado"
          icon={<TrendingDown size={20}/>}
          />

          <StatCard
          title="Presupuesto Restante"
          value="$24000"
          change="+15% desd el mes pasado"
          icon={<PiggyBank size={20}/>}
          />
        </div>

        <FinancialSummary/>
      </div>
    )
  }