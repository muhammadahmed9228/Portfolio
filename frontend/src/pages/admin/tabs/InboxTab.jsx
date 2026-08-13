import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, toggleMessageRead, removeMessage } from '../../../features/contacts/contactSlice';
import { Mail, MailOpen, Trash2, Calendar, User, Clock, Loader2, CheckCircle2 } from 'lucide-react';

const InboxTab = () => {
  const dispatch = useDispatch();
  const { messages, unreadCount, isLoading } = useSelector((state) => state.contacts);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      dispatch(toggleMessageRead(msg._id));
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this message?')) {
      dispatch(removeMessage(id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 bg-slate-900 p-4 sm:p-6 border border-slate-800 rounded-2xl">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex flex-wrap items-center gap-3">
            <span>Recruiter Messages Inbox</span>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full font-semibold">
                {unreadCount} Unread
              </span>
            )}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Review incoming inquiries submitted through your portfolio contact form.
          </p>
        </div>
      </div>

      {/* Main Inbox Workspace (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Message List Sidebar */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
              <p className="text-sm">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Mail className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-base font-medium">Inbox is empty</p>
              <p className="text-xs mt-1">Messages from visitors will show up here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60 overflow-y-auto max-h-[600px] custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 transition-all cursor-pointer flex items-start gap-3 ${
                    selectedMessage?._id === msg._id
                      ? 'bg-emerald-500/10 border-l-4 border-l-emerald-500'
                      : !msg.isRead
                      ? 'bg-slate-800/60'
                      : 'hover:bg-slate-800/30'
                  }`}
                >
                  <div className="mt-1">
                    {!msg.isRead ? (
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <MailOpen className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm truncate ${!msg.isRead ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                        {msg.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-medium truncate mt-0.5">{msg.subject}</p>
                    <p className="text-xs text-slate-500 truncate mt-1 line-clamp-1">{msg.message}</p>
                  </div>

                  <button
                    onClick={(e) => handleDelete(msg._id, e)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Message Detail Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="pb-4 border-b border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-white break-words">{selectedMessage.subject}</h3>
                  <button
                    onClick={() => dispatch(toggleMessageRead(selectedMessage._id))}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    Mark as {selectedMessage.isRead ? 'Unread' : 'Read'}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <strong>{selectedMessage.name}</strong> (&lt;{selectedMessage.email}&gt;)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {formatDate(selectedMessage.createdAt)}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div className="bg-slate-950 p-5 border border-slate-800 rounded-xl text-slate-300 text-sm whitespace-pre-wrap leading-relaxed min-h-[200px]">
                {selectedMessage.message}
              </div>

              {/* Quick Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl transition-all inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={(e) => handleDelete(selectedMessage._id, e)}
                  className="px-4 py-2 text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-sm font-medium rounded-xl transition-all"
                >
                  Delete Message
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-slate-500">
              <MailOpen className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">Select a message from the list to view its contents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxTab;