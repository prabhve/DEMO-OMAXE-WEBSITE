import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  UserPlus,
  Search,
  Key,
  Lock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Mail,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { AdminUser, Role } from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { useAuthStore } from '../../../lib/admin/auth-store';
import { DataTable, Column } from '../../../components/admin/ui/DataTable';
import { Button, Badge, Modal } from '../../../components/admin/ui/BasicPrimitives';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<AdminUser> | null>(null);

  const addToast = useAdminStore((s) => s.addToast);
  const currentUser = useAuthStore((s) => s.user);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const res = await api.users.list();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', description: 'Failed to load system users', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSaveUser = async () => {
    if (!editingUser || !editingUser.name || !editingUser.email) {
      addToast({ title: 'Validation', description: 'Name and email are required', type: 'error' });
      return;
    }

    try {
      if (editingUser.id) {
        const updated = await api.users.update(editingUser.id, editingUser);
        setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
        addToast({ title: 'User Updated', description: `Saved changes to ${editingUser.name}`, type: 'success' });
      } else {
        const created = await api.users.create({
          ...editingUser,
          id: `usr-${Date.now()}`,
          status: 'active',
          twoFactorEnabled: false,
          assignedCities: editingUser.assignedCities || [],
          assignedProjects: editingUser.assignedProjects || [],
          role: editingUser.role || 'editor',
          createdAt: new Date().toISOString(),
        } as any);
        setUsers((prev) => [created, ...prev]);
        addToast({ title: 'User Invited', description: `Invitation sent to ${editingUser.email}`, type: 'success' });
      }
      setIsModalOpen(false);
      setEditingUser(null);
    } catch {
      addToast({ title: 'Error', description: 'Failed to save user', type: 'error' });
    }
  };

  const toggleStatus = async (user: AdminUser) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    try {
      const updated = await api.users.update(user.id, { status: newStatus });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
      addToast({ title: 'Status Updated', description: `${user.name} is now ${newStatus}`, type: 'info' });
    } catch {
      addToast({ title: 'Error', description: 'Failed to update user status', type: 'error' });
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const columns: Column<AdminUser>[] = [
    {
      id: 'name',
      header: 'Admin Member',
      cell: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold text-xs flex items-center justify-center shrink-0">
            {(user.name || 'Admin').slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100">
              {user.name}
            </span>
            <span className="text-[11px] text-neutral-400 font-mono">
              {user.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Assigned Role',
      cell: (user) => {
        const isSuper = String(user.role || '').toLowerCase().includes('super');
        return (
          <Badge variant={isSuper ? 'warning' : 'neutral'} className="capitalize font-mono text-[11px]">
            {user.role}
          </Badge>
        );
      },
    },
    {
      id: 'cities',
      header: 'City Assignment',
      cell: (user) => (
        <span className="text-xs text-neutral-600 dark:text-neutral-400">
          {user.assignedCities?.length ? user.assignedCities.join(', ') : 'All Pan-India'}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (user) => (
        <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
          {user.status}
        </Badge>
      ),
    },
    {
      id: 'twoFactor',
      header: '2FA Security',
      cell: (user) => (
        <span className="text-xs flex items-center gap-1 text-neutral-500">
          {user.twoFactorEnabled ? (
            <span className="text-emerald-600 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Enforced
            </span>
          ) : (
            <span className="text-neutral-400">Disabled</span>
          )}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: (user) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={() => { setEditingUser(user); setIsModalOpen(true); }}
            className="text-xs text-neutral-600 hover:text-amber-600 font-medium"
          >
            Edit
          </button>
          {user.id !== currentUser?.id && (
            <button
              type="button"
              onClick={() => toggleStatus(user)}
              className="text-xs text-neutral-400 hover:text-rose-600"
            >
              {user.status === 'active' ? 'Suspend' : 'Activate'}
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" /> Team & Role Permissions
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Manage administrative personnel, granular RBAC access controls, and regional city assignments.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setEditingUser({ role: 'editor', status: 'active', assignedCities: [] });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" /> Invite Admin Member
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-md border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search team members by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAFAFA] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none text-neutral-900 dark:text-neutral-100"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-3 py-2 text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-600 cursor-pointer shadow-sm"
        >
          <option value="all" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">All Roles</option>
          <option value="super_admin" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Super Admin</option>
          <option value="admin" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Admin</option>
          <option value="editor" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Editor</option>
          <option value="agent" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Sales Agent</option>
          <option value="viewer" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Viewer</option>
        </select>
      </div>

      {/* Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        keyField="id"
        isLoading={isLoading}
        emptyMessage="No administrators found."
      />

      {/* Add / Edit User Modal */}
      {isModalOpen && editingUser && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
          title={editingUser.id ? 'Edit Team Member' : 'Invite New Administrator'}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={editingUser.name || ''}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Corporate Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={editingUser.email || ''}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Assigned RBAC Role
              </label>
              <select
                value={editingUser.role || 'editor'}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none cursor-pointer"
              >
                <option value="super_admin" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Super Admin (Full system control & user management)</option>
                <option value="admin" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Admin (Publishing, projects, CMS, and leads)</option>
                <option value="editor" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Editor (Drafting and editing content only)</option>
                <option value="agent" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Sales Agent (Lead CRM handling only)</option>
                <option value="viewer" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Viewer (Read-only analytics access)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveUser}>
                {editingUser.id ? 'Save Changes' : 'Send Invitation'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
