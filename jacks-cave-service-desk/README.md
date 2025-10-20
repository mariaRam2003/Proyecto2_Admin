# 🎓 Jack's Cave - Service Desk

Sistema de gestión de tickets (Service Desk) para la plataforma estudiantil Jack's Cave de la Universidad del Valle de Guatemala. Desarrollado como proyecto de la Fase 2 del curso de Administración de Tecnologías de Información.

![Service Desk Preview](https://img.shields.io/badge/React-18.2.0-blue) ![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange) ![Status](https://img.shields.io/badge/Status-Active-success)

## 📖 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Instalación](#instalación)
- [Uso del Sistema](#uso-del-sistema)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Categorización de Tickets](#categorización-de-tickets)
- [SLA y Prioridades](#sla-y-prioridades)
- [Deploy](#deploy)
- [Equipo de Desarrollo](#equipo-de-desarrollo)

---

## 🎯 Descripción del Proyecto

Jack's Cave es una plataforma estudiantil de la carrera de Ingeniería en Ciencias de la Computación de UVG. Este Service Desk fue diseñado para gestionar eficientemente los incidentes y solicitudes de soporte técnico que pueden surgir en la operación de la plataforma.

El sistema implementa las mejores prácticas de **ITIL v4** y **ITSM** (IT Service Management), con énfasis en:

- ✅ Gestión de Incidentes
- ✅ Categorización basada en SLA
- ✅ Priorización automática
- ✅ Tablero Kanban para seguimiento
- ✅ Sistema de comentarios colaborativo
- ✅ Dashboard de estadísticas

---

## ⚡ Características Principales

### 1. **Creación de Tickets**
- Formulario intuitivo para reportar problemas
- Categorización automática según tipo de incidente
- Asignación de prioridad basada en impacto al negocio
- Sistema de tags para clasificación adicional

### 2. **Tablero Kanban**
- Vista visual de tickets en 4 estados: Abiertos, En Progreso, Resueltos, Cerrados
- Filtrado por categoría en tiempo real
- Contador de tickets por columna
- Diseño responsive (móvil, tablet, desktop)

### 3. **Gestión de Tickets**
- Vista detallada de cada ticket
- Actualización de estado en tiempo real
- Sistema de comentarios para seguimiento
- Historial de interacciones

### 4. **Dashboard de Estadísticas**
- Gráficas de distribución por categoría
- Tags más frecuentes
- Métricas generales del sistema
- Indicadores de rendimiento (KPIs)

### 5. **Filtros Avanzados**
- Filtrado por categoría
- Vista consolidada o específica
- Búsqueda rápida de tickets

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca de JavaScript para interfaces de usuario
- **Lucide React** - Iconos modernos y optimizados
- **Tailwind CSS (CDN)** - Framework de CSS utility-first

### Backend / Hosting
- **Firebase Hosting** - Hosting de aplicaciones web

### Herramientas de Desarrollo
- **Create React App** - Configuración inicial del proyecto
- **VS Code** - Editor de código
- **Git** - Control de versiones
- **npm** - Gestor de paquetes

---

## 🏗️ Arquitectura del Sistema
```
┌─────────────────────────────────────────────────────────┐
│                     USUARIO FINAL                        │
│              (Estudiantes de Jack's Cave)                │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│                  INTERFAZ WEB (React)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Tablero    │  │ Formularios  │  │ Estadísticas │  │
│  │   Kanban     │  │   Tickets    │  │  Dashboard   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│              GESTIÓN DE ESTADO (React)                   │
│  • Tickets                                               │
│  • Categorías                                            │
│  • Filtros                                               │
│  • Estadísticas                                          │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│                DATOS Y CONFIGURACIÓN                     │
│  • categories.js (5 categorías según SLA)               │
│  • initialTickets.js (Datos de ejemplo)                 │
│  • helpers.js (Funciones auxiliares)                    │
└─────────────────────────────────────────────────────────┘
```

---

## 💻 Instalación

### Prerrequisitos

- Node.js 14+ instalado
- npm 6+ instalado
- Cuenta de Firebase (para deploy)

### Pasos de Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/jacks-cave-service-desk.git
cd jacks-cave-service-desk
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm start
```

4. **Abre tu navegador**
```
http://localhost:3000
```

---

## 📱 Uso del Sistema

### Para Usuarios (Estudiantes)

1. **Reportar un Problema**
   - Click en "Crear Ticket"
   - Completa título y descripción
   - Selecciona la categoría del problema
   - Agrega tags relevantes
   - Envía el ticket

2. **Seguimiento de Tickets**
   - Ve tus tickets en el tablero Kanban
   - Click en un ticket para ver detalles
   - Agrega comentarios para seguimiento

### Para Equipo de Soporte (Service Desk)

1. **Gestionar Tickets**
   - Filtra por categoría según prioridad
   - Actualiza el estado de los tickets
   - Responde mediante comentarios
   - Cierra tickets resueltos

2. **Monitorear Métricas**
   - Ve estadísticas en el dashboard
   - Identifica problemas recurrentes
   - Analiza tags más frecuentes

---

## 📂 Estructura del Proyecto
```
jacks-cave-service-desk/
├── public/
│   └── index.html              # HTML principal con Tailwind CDN
├── src/
│   ├── components/             # Componentes React (futuro)
│   ├── data/
│   │   ├── categories.js       # Categorías basadas en SLA
│   │   └── initialTickets.js   # Tickets de ejemplo
│   ├── utils/
│   │   └── helpers.js          # Funciones auxiliares
│   ├── App.jsx                 # Componente principal
│   ├── index.js                # Punto de entrada
│   └── index.css               # Estilos globales
├── build/                      # Build de producción (generado)
├── .firebaserc                 # Configuración Firebase
├── firebase.json               # Configuración Hosting
├── package.json                # Dependencias del proyecto
└── README.md                   # Este archivo
```

---

## 🏷️ Categorización de Tickets

Basado en el **SLA (Service Level Agreement)** de Jack's Cave:

| Categoría | Prioridad | Tiempo de Resolución | Ejemplos |
|-----------|-----------|---------------------|----------|
| **Disponibilidad** | Crítico | 1 día hábil | Caída total, lentitud crítica |
| **Funcionalidad** | Alto | 3 días hábiles | Foros, publicaciones, multimedia |
| **Acceso y Permisos** | Alto | 3 días hábiles | Login, credenciales, roles |
| **Interfaz y Usabilidad** | Medio | 1 semana hábil | Errores visuales, diseño |
| **Seguridad** | Crítico | 1 día hábil | Vulnerabilidades, accesos no autorizados |

---

## ⏱️ SLA y Prioridades

### Niveles de Prioridad

#### 🔴 Crítico
- Impacto al negocio: **ALTO**
- Usuarios afectados: **Mayoría o todos**
- Resolución: **24 horas**
- Ejemplos: Caída total, vulnerabilidad de seguridad

#### 🟠 Alto
- Impacto al negocio: **MEDIO-ALTO**
- Usuarios afectados: **Múltiples usuarios**
- Resolución: **3 días hábiles**
- Ejemplos: Funciones principales no disponibles

#### 🟡 Medio
- Impacto al negocio: **MEDIO**
- Usuarios afectados: **Algunos usuarios**
- Resolución: **1 semana hábil**
- Ejemplos: Funciones secundarias con problemas

#### 🔵 Bajo
- Impacto al negocio: **BAJO**
- Usuarios afectados: **Pocos o ninguno**
- Resolución: **1 mes hábil**
- Ejemplos: Mejoras estéticas, sugerencias

### Proceso de Escalación
```
L1: Service Desk (Estudiantes voluntarios)
    ↓ (Si no se puede resolver)
L2: Soporte Técnico Especializado (Administradores)
    ↓ (Si es crítico o requiere recursos)
L3: Coordinación / Dirección (Asociación + Dirección UVG)
```

---

## 🚀 Deploy

### Deploy Manual en Firebase

1. **Instala Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Inicia sesión**
```bash
firebase login
```

3. **Inicializa Firebase**
```bash
firebase init
```

4. **Construye el proyecto**
```bash
npm run build
```

5. **Deploy**
```bash
firebase deploy
```

### URL de Producción
```
https://service-desk-jackscave.web.app
```

---

## 📊 KPIs del Sistema

### Técnicos
- **Disponibilidad de servicio:** > 26 días de uptime al mes (90%)
- **Tiempo medio de resolución (MTTR):** 7 días hábiles
- **Tiempo de respuesta Service Desk:** < 24 horas

### De Negocio
- **Engagement estudiantil:** > 100 interacciones mensuales
- **Usuarios activos:** 10% usan la plataforma semanalmente
- **Satisfacción del usuario:** > 4.0/5 en encuestas

---

## 👥 Equipo de Desarrollo

**Proyecto:** Service Desk - Jack's Cave  
**Curso:** Administración de Tecnologías de Información  
**Institución:** Universidad del Valle de Guatemala  
**Carrera:** Ingeniería en Ciencias de la Computación  
- Maria Marta Ramirez
- Gustavo Andres Gonzalez Pineda
- Diego Alberto Leiva
- Jose Pablo Orellana 
- Renatto Guzman

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la Universidad del Valle de Guatemala.


## 📚 Referencias

- [ITIL v4 Foundation](https://www.axelos.com/certifications/itil-service-management)
- [React Documentation](https://react.dev)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Tailwind CSS](https://tailwindcss.com)

---

**Última actualización:** Octubre 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Activo en Producción