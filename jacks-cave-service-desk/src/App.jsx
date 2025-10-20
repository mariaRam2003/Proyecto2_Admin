import React, { useState } from "react";
import { Plus, MessageSquare, Filter } from "lucide-react";
import { categories, priorityLabels, statusColumns } from "./data/categories";
import { initialTickets } from "./data/initialTickets";
import {
  getPriorityColor,
  getCategoryColor,
  getStatistics,
} from "./utils/helpers";

function App() {
  const [activeView, setActiveView] = useState("board");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [tickets, setTickets] = useState(initialTickets);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });

  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.category) return;

    const category = categories.find((c) => c.id === newTicket.category);
    const ticket = {
      id: tickets.length + 1,
      title: newTicket.title,
      description: newTicket.description,
      category: newTicket.category,
      priority: category.priority,
      status: "open",
      tags: newTicket.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      comments: [],
      reporter: "Usuario Actual",
      created: new Date(),
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ title: "", description: "", category: "", tags: "" });
    setShowCreateModal(false);
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(
      tickets.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  const addComment = (ticketId, comment) => {
    setTickets(
      tickets.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            comments: [
              ...t.comments,
              {
                user: "Usuario Actual",
                avatar: "UC",
                text: comment,
                time: "Justo ahora",
              },
            ],
          };
        }
        return t;
      })
    );
  };

  const getTicketsByStatus = (status) => {
    return tickets.filter((t) => {
      const matchesStatus = t.status === status;
      const matchesCategory =
        filterCategory === "all" || t.category === filterCategory;
      return matchesStatus && matchesCategory;
    });
  };

  const stats = getStatistics(tickets, categories);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Jack's Cave - Service Desk
              </h1>
              <p className="text-sm text-gray-600">
                Sistema de Gestión de Tickets
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Crear Ticket</span>
            </button>
          </div>

          <div className="flex gap-4 border-t border-gray-100 pt-3 pb-1">
            <button
              onClick={() => setActiveView("board")}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeView === "board"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tablero Kanban
            </button>
            <button
              onClick={() => setActiveView("stats")}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeView === "stats"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Estadísticas
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeView === "board" && (
          <>
            {/* FILTERS */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Filter size={18} className="text-gray-600" />
                <span className="font-medium text-gray-700">
                  Filtrar por categoría:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterCategory("all")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    filterCategory === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Todas
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      filterCategory === cat.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* KANBAN BOARD */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statusColumns.map((column) => (
                <div
                  key={column.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div
                    className={`${column.color} p-4 border-b border-gray-200`}
                  >
                    <h3 className="font-semibold text-gray-800">
                      {column.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {getTicketsByStatus(column.id).length} tickets
                    </p>
                  </div>
                  <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
                    {getTicketsByStatus(column.id).map((ticket) => {
                      const category = categories.find(
                        (c) => c.id === ticket.category
                      );
                      return (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicket(ticket)}
                          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm flex-1 pr-2">
                              {ticket.title}
                            </h4>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(
                                ticket.priority
                              )}`}
                            >
                              {priorityLabels[ticket.priority]}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {ticket.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs px-2 py-1 rounded text-white ${getCategoryColor(
                                ticket.category
                              )}`}
                            >
                              {category?.name}
                            </span>
                            {ticket.comments.length > 0 && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <MessageSquare size={14} />
                                <span className="text-xs">
                                  {ticket.comments.length}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeView === "stats" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TICKETS POR CATEGORÍA */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Tickets por Categoría
              </h3>
              <div className="space-y-4">
                {stats.categoryStats.map((stat) => {
                  const total = tickets.length;
                  const percentage =
                    total > 0 ? Math.round((stat.count / total) * 100) : 0;
                  return (
                    <div key={stat.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {stat.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {stat.count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${getCategoryColor(
                            categories.find((c) => c.name === stat.name)?.id
                          )}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TAGS MÁS FRECUENTES */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Tags Más Frecuentes
              </h3>
              <div className="space-y-4">
                {stats.topTags.map(([tag, count]) => {
                  const maxCount = stats.topTags[0][1];
                  const height = (count / maxCount) * 100;
                  return (
                    <div key={tag}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {tag}
                        </span>
                        <span className="text-sm text-gray-600">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-8">
                        <div
                          className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
                          style={{ width: `${height}%` }}
                        >
                          {height > 20 && count}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MÉTRICAS GENERALES */}
            <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Métricas del Sistema
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">
                    {tickets.length}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Total Tickets</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-3xl font-bold text-orange-600">
                    {tickets.filter((t) => t.status === "open").length}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Abiertos</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {tickets.filter((t) => t.status === "resolved").length}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Resueltos</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-3xl font-bold text-red-600">
                    {tickets.filter((t) => t.priority === "critical").length}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Críticos</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: CREAR TICKET */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Crear Nuevo Ticket
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Problema *
                  </label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: No puedo iniciar sesión"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Detallada
                  </label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe el problema..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría del Problema *
                  </label>
                  <select
                    value={newTicket.category}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} - Prioridad: {priorityLabels[cat.priority]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (separados por comas)
                  </label>
                  <input
                    type="text"
                    value={newTicket.tags}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, tags: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: login, urgente, móvil"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateTicket}
                  disabled={!newTicket.title || !newTicket.category}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Crear Ticket
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewTicket({
                      title: "",
                      description: "",
                      category: "",
                      tags: "",
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DETALLE DE TICKET */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedTicket.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Reportado por {selectedTicket.reporter} •{" "}
                    {selectedTicket.created.toLocaleString("es-GT")}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(
                    selectedTicket.priority
                  )}`}
                >
                  {priorityLabels[selectedTicket.priority]}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(
                    selectedTicket.category
                  )}`}
                >
                  {
                    categories.find((c) => c.id === selectedTicket.category)
                      ?.name
                  }
                </span>
                {selectedTicket.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Descripción
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedTicket.description}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado del Ticket
                </label>
                <select
                  value={selectedTicket.status}
                  onChange={(e) => {
                    handleStatusChange(selectedTicket.id, e.target.value);
                    setSelectedTicket({
                      ...selectedTicket,
                      status: e.target.value,
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusColumns.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Comentarios ({selectedTicket.comments.length})
                </h3>
                <div className="space-y-4 mb-4">
                  {selectedTicket.comments.map((comment, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium flex-shrink-0">
                        {comment.avatar}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-900">
                            {comment.user}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    id="comment-input"
                    placeholder="Agregar un comentario..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        addComment(selectedTicket.id, e.target.value);
                        setSelectedTicket({
                          ...selectedTicket,
                          comments: [
                            ...selectedTicket.comments,
                            {
                              user: "Usuario Actual",
                              avatar: "UC",
                              text: e.target.value,
                              time: "Justo ahora",
                            },
                          ],
                        });
                        e.target.value = "";
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById("comment-input");
                      if (input.value.trim()) {
                        addComment(selectedTicket.id, input.value);
                        setSelectedTicket({
                          ...selectedTicket,
                          comments: [
                            ...selectedTicket.comments,
                            {
                              user: "Usuario Actual",
                              avatar: "UC",
                              text: input.value,
                              time: "Justo ahora",
                            },
                          ],
                        });
                        input.value = "";
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
