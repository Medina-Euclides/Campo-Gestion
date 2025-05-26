import { useEffect, useState } from 'react';
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { app } from "../../services/firebase";
import { useApp } from '../../context/AppContext';
// import { Card } from '../ui/Card';

const IARecomendation = () => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { projects, transactions, financeStats, dashboardStats } = useApp();

  useEffect(() => {
    generateRecommendation();
  }, [projects, transactions]);

  const generateRecommendation = async () => {
    try {
      setLoading(true);
      const ai = getAI(app, { backend: new GoogleAIBackend() });
      const model = getGenerativeModel(ai, { model: "gemini-2.0-flash" });

      const prompt = `Analiza estos datos y genera una recomendación corta y concisa sobre la gestión del campo:
        - Balance total: ${financeStats.totalBalance}
        - Proyectos activos: ${dashboardStats.projectCount}
        - Estado financiero: ${financeStats.totalIncome > financeStats.totalExpenses ? 'Positivo' : 'Negativo'}
        - Presupuesto restante: ${financeStats.remainingBudget}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setRecommendation(text);
    } catch (error) {
      console.error('Error generando recomendación:', error);
      setRecommendation('No se pudo generar una recomendación en este momento.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">Recomendación IA</h3>
          <p className="text-sm text-gray-500">Análisis basado en datos actuales</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} />
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <p className="text-gray-700">
            {loading ? 'Generando recomendación...' : recommendation}
          </p>
        </div>
      </div>

      <button
        onClick={generateRecommendation}
        disabled={loading}
        className="mt-4 text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
      >
        Actualizar recomendación
      </button>
    </div>
  );
}

export default IARecomendation;