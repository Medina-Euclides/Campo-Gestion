/**
 * pagina de dashboard
 */

import { BarChartRecharts } from "../components/charts/chart";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { StatCard } from "../components/dashboard/StatCard";
import { Card } from "../components/ui/Card";

const data = [
    { name: 'Ene', Ingresos: 4000, Egresos: 2500, proyecto: 'Papa' },
    { name: 'Feb', Ingresos: 3000, Egresos: 1500, proyecto: 'Yuca' },
    { name: 'Mar', Ingresos: 5000, Egresos: 3800, proyecto: 'Café' },
    { name: 'Abr', Ingresos: 7500, Egresos: 3700, proyecto: 'Frijol' },
    { name: 'May', Ingresos: 6000, Egresos: 4800, proyecto: 'Maíz' },
    { name: 'Jun', Ingresos: 5000, Egresos: 3600, proyecto: 'Tomate' },
    { name: 'Jul', Ingresos: 9000, Egresos: 4200, proyecto: 'Panela' },
  ];

export function DashboardPage() {
    return(
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                title="Proyectos activos" 
                value="10.000.000.000" 
                change="+ 12 mes paso"
                />
                <StatCard 
                title="Proyectos activos" 
                value="12333" 
                change="+ 12 mes paso"
                />
                <StatCard 
                title="Proyectos activos" 
                value="118999" 
                change="+ 12 mes paso"
                />
                <StatCard 
                title="Proyectos activos" 
                value="13454" 
                change="+ 12 mes paso"
                />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[600px]">
                            <BarChartRecharts
                            title="Resumen de Proyectos"
                            description="Visualización de ingresos y egresos por proyecto y mes"
                            data={data}
                            keys={[
                                {name:'Ingresos', color: '#00cc88'},
                                { name: 'Egresos', color: '#ff6666' },
                            ]}
                            />
                        </div>
                    </div>
                </Card>

                <Card>
                    <RecentTransactions/>
                </Card>

            </div>
        </div>

    );
}