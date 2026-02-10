import React from 'react';
import { Calendar, Clock, CheckCircle, CalendarX, MessageSquare, AlertOctagon, AlertTriangle, Activity, User } from 'lucide-react';

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Appointments */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">إجمالي المواعيد</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.appointments.total}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-500">{stats.appointments.confirmed} مؤكد</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
            <Calendar className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Pending Appointments */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">قيد الانتظار</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.appointments.pending}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-500">يحتاج إلى تأكيد</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center">
            <Clock className="w-7 h-7 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Total Contacts */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">إجمالي الاتصالات</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.contacts.total}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-500">{stats.contacts.new} جديد</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">حالات طارئة</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.contacts.emergency}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-red-500">تحتاج إلى اهتمام فوري</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
            <AlertOctagon className="w-7 h-7 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;