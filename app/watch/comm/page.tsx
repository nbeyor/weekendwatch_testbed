'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Phone, Mic } from 'lucide-react';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { ListItem } from '@/components/ui/ListItem';

export default function CommHubPage() {
  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Communications" showBack backHref="/watch" />

      <main className="flex-1 overflow-auto">
        <div className="border-b-2 border-black">
          <ListItem href="/watch/messages">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              <div>
                <div className="font-medium">Messages</div>
                <div className="text-xs text-gray-dark">View & send texts</div>
              </div>
            </div>
          </ListItem>

          <ListItem href="/watch/calls">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <div>
                <div className="font-medium">Calls</div>
                <div className="text-xs text-gray-dark">Recent & contacts</div>
              </div>
            </div>
          </ListItem>

          <ListItem href="/watch/voice">
            <div className="flex items-center gap-3">
              <Mic className="w-5 h-5" />
              <div>
                <div className="font-medium">Voice Commands</div>
                <div className="text-xs text-gray-dark">Quick actions</div>
              </div>
            </div>
          </ListItem>
        </div>
      </main>
    </div>
  );
}
