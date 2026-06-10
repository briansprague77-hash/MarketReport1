'use client';

import { useState, type FormEvent } from 'react';
import { X, Plus } from 'lucide-react';
import type { MarketEvent } from '@/data/events';

interface AddEventModalProps {
  developmentSlug: string;
  developmentName: string;
  onAdd: (event: Omit<MarketEvent, 'id'>) => void;
  onClose: () => void;
}

const EVENT_TYPES: { value: MarketEvent['type']; label: string }[] = [
  { value: 'grand-opening', label: 'Grand Opening' },
  { value: 'broker-vip', label: 'Broker VIP Event' },
  { value: 'virtual', label: 'Virtual Event' },
  { value: 'private', label: 'Private Event' },
];

const TYPE_COLORS: Record<MarketEvent['type'], MarketEvent['color']> = {
  'grand-opening': 'gold',
  'broker-vip': 'blue',
  virtual: 'emerald',
  private: 'burgundy',
};

const TYPE_BADGES: Record<MarketEvent['type'], string> = {
  'grand-opening': 'Grand Opening',
  'broker-vip': 'Broker VIP Event',
  virtual: 'Virtual Tour',
  private: 'Private Event',
};

export default function AddEventModal({
  developmentSlug,
  developmentName,
  onAdd,
  onClose,
}: AddEventModalProps) {
  const [type, setType] = useState<MarketEvent['type']>('broker-vip');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [bonus, setBonus] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Format the date for display
    const dateObj = new Date(date + 'T12:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newEvent: Omit<MarketEvent, 'id'> = {
      developmentSlug,
      developmentName,
      type,
      title: title.trim(),
      description: description.trim(),
      date: formattedDate,
      time: time.trim(),
      location: location.trim(),
      address: address.trim(),
      badge: TYPE_BADGES[type],
      color: TYPE_COLORS[type],
      ...(bonus.trim() ? { bonus: bonus.trim() } : {}),
    };

    onAdd(newEvent);
    onClose();
  }

  const isValid = title.trim() && date && time.trim() && location.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-charcoal-900 border border-charcoal-700 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800">
          <div>
            <h2 className="text-lg font-heading font-bold text-ivory-50">
              Add Event
            </h2>
            <p className="text-xs font-body text-charcoal-400 mt-0.5">
              {developmentName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-charcoal-400 hover:text-ivory-50 transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Event Type */}
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
              Event Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`text-xs font-body font-medium px-3 py-2 rounded-sm border transition-colors ${
                    type === t.value
                      ? 'bg-gold-500/15 border-gold-500 text-gold-400'
                      : 'border-charcoal-700 text-charcoal-400 hover:border-charcoal-500 hover:text-ivory-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exclusive Broker Preview"
              className="w-full px-3 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-sm font-body text-ivory-50 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-500 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the event..."
              rows={3}
              className="w-full px-3 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-sm font-body text-ivory-50 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-500 transition-colors resize-none"
            />
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-sm font-body text-ivory-50 focus:outline-none focus:border-gold-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                Time *
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 5:30 PM – 8:00 PM"
                className="w-full px-3 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-sm font-body text-ivory-50 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Location + Address */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                Venue / Location *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Sales Gallery"
                className="w-full px-3 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-sm font-body text-ivory-50 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                Address / Details
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Downtown St. Pete"
                className="w-full px-3 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-sm font-body text-ivory-50 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          {/* Broker Bonus (optional) */}
          <div>
            <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
              Broker Incentive (optional)
            </label>
            <input
              type="text"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              placeholder="e.g. 3% co-op + $5K bonus"
              className="w-full px-3 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-sm text-sm font-body text-ivory-50 placeholder:text-charcoal-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-sm text-sm font-body font-semibold uppercase tracking-wide transition-all ${
              isValid
                ? 'bg-gold-500 text-charcoal-900 hover:bg-gold-400 cursor-pointer'
                : 'bg-charcoal-700 text-charcoal-500 cursor-not-allowed'
            }`}
          >
            <Plus className="h-4 w-4" />
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
