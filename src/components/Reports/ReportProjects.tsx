import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';
import jsPDF from 'jspdf';

export const ReportProjects: React.FC = () => {
  const { dashboardStats } = useApp();
  const { totalBalance, recentTransactions } = dashboardStats;

  const [descripcion, setDescripcion] = useState('Reporte automático generado');
  const [observaciones, setObservaciones] = useState('');
  const [fecha, setFecha] = useState(() => new Date().toISOString().substring(0, 10));

  const generarReporte = () => {
    const reporte = {
      tipo: 'Financiero',
      fecha,
      descripcion,
      observaciones,
      resumen: {
        balanceTotal: totalBalance,
        cantidadTransacciones: recentTransactions.length,
        transaccionesRecientes: recentTransactions.slice(0, 5),
      },
    };

    console.log('📄 Reporte generado:', reporte);
    alert('Reporte generado correctamente.');
    setObservaciones('');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Reporte financiero', 20, 20);

    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 35);
    doc.text(`Descripción: ${descripcion}`, 20, 45);
    doc.text(`Observaciones: ${observaciones || '-'}`, 20, 55);

    doc.text(`Balance total: $${totalBalance.toLocaleString('es-AR')}`, 20, 70);
    doc.text(`Cantidad de transacciones: ${recentTransactions.length}`, 20, 80);

    doc.text('Transacciones recientes:', 20, 95);
    recentTransactions.slice(0, 5).forEach((t, index) => {
      doc.text(
        `${index + 1}. ${t.date} - ${t.description} (${t.category}) - $${t.amount}`,
        25,
        105 + index * 10
      );
    });

    doc.save(`Reporte_Financiero_${fecha}.pdf`);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Generar Reporte </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)} //
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Observaciones</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
      </div>

      <div className="text-sm text-gray-700 border-t pt-4 space-y-1">
        <p><strong>Balance total:</strong> ${totalBalance.toLocaleString('es-AR')}</p>
        <p><strong>Transacciones recientes:</strong> {recentTransactions.length}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={generarReporte}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Generar Reporte
        </button>
        <button
          onClick={exportarPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Exportar a PDF
        </button>
      </div>
    </Card>
  );
};