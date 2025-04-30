/**
 * pagina donde se renderizan los componentes proyectos
 */

import React from 'react'; //necesario para usar React a travez de componentes

const proyectos = [         //arreglo de objetos que contiene los proyectos
  {
    nombre: "Maiz Norte",
    cultivo: "Maiz",
    responsable: "Carlos Mendez, Ana Lopez",
    estado: "Activo",
    progreso: "75%",
  },

  {
    nombre: "Tomate Sur",
    cultivo: "Tomate",
    responsable: "Juan Perez, Maria Garcia",
    estado: "En espera",
    progreso: "50%",
  },

  {
    nombre: "Cebolla Centro",
    cultivo: "Cebolla",
    responsable: "Luis Martinez, Ana Torres",
    estado: "Finalizado",
    progreso: "100%",
  },

  {
    nombre: "Pimiento Este",
    cultivo: "Pimiento",
    responsable: "Carlos Mendez, Ana Lopez",
    estado: "Activo",
    progreso: "75%",
  },

  {
    nombre: "Alfalfa Central",
    cultivo: "Alfalfa",
    responsables: "Roberto Sánchez, Lucía Díaz",
    estado: "Completado",
    progreso: 100,
  },
];

const getEstadoColor = (estado: string) => {   //funcion que retorna el color del estado del proyecto
  // dependiendo del estado del proyecto
  switch (estado) {
    case "Activo":
      return "bg-green-500";
    case "planificacion":
      return "bg-yellow-500";
    case "Completado":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};
  
export function ProjectsPage() {      //funcion que retorna el componente ProjectsPage
  return(                                 
    <div className='p-6'>              
      <div className="flex items center justify-between mb-6">
        <h1 className="text-2xl font-bold">proyectos</h1>    
        <input
          type="text"
          placeholder="Buscar proyecto..."          //input para buscar proyectos
          className="border rounded-md p-2 w-64"     //estilos del input
          />
    </div>

    <p className="mb-4 text-gray-600">Gestione sus proyectos agricolas aquí</p> 

    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>                                                         
          <tr className='bg-gray-100'>
            <th className='p-4 text-left'>Proyecto</th>   
            <th className='p-4 text-left'>Responsable</th>   
            <th className='p-4 text-left'>Estado</th>         
            <th className='p-4 text-left'>Progreso</th>
            <th className='p-4 text-left'>Acciones</th>
          </tr>
        </thead>
      </table>
    </div>
    </div>
  );
};
