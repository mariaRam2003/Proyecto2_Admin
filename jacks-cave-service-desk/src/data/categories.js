export const categories = [
  {
    id: "availability",
    name: "Disponibilidad",
    priority: "critical",
    color: "red",
    description: "Caídas del sistema, lentitud crítica",
    slaTime: "1 día hábil",
  },
  {
    id: "functionality",
    name: "Funcionalidad",
    priority: "high",
    color: "orange",
    description: "Fallos en foros, publicación de artículos",
    slaTime: "3 días hábiles",
  },
  {
    id: "access",
    name: "Acceso y Permisos",
    priority: "high",
    color: "yellow",
    description: "Problemas de login, credenciales",
    slaTime: "3 días hábiles",
  },
  {
    id: "interface",
    name: "Interfaz y Usabilidad",
    priority: "medium",
    color: "blue",
    description: "Errores visuales, diseño",
    slaTime: "1 semana hábil",
  },
  {
    id: "security",
    name: "Seguridad",
    priority: "critical",
    color: "red",
    description: "Vulnerabilidades, accesos no autorizados",
    slaTime: "1 día hábil",
  },
];

export const priorityLabels = {
  critical: "Crítico",
  high: "Alto",
  medium: "Medio",
  low: "Bajo",
};

export const statusColumns = [
  { id: "open", name: "Abiertos", color: "bg-gray-100" },
  { id: "in-progress", name: "En Progreso", color: "bg-blue-50" },
  { id: "resolved", name: "Resueltos", color: "bg-green-50" },
  { id: "closed", name: "Cerrados", color: "bg-gray-50" },
];
