import React from 'react';
import Header from './components/Header.jsx';
import TeamStatsChart from './components/TeamStatsChart.jsx';
import HormoneCycle from './components/HormoneCycle.jsx';
import MentalDiary from './components/MentalDiary.jsx';
import AiChat from './components/AiChat.jsx';
import CalendarView from './components/CalendarView.jsx';
import ProFeatures from './components/ProFeatures.jsx';

export default function App() {
  return (
    <div className="py-6 px-4 max-w-3xl mx-auto">
      <Header />
      <HormoneCycle />
      <MentalDiary />
      <CalendarView />
      <TeamStatsChart />
      <AiChat />
      <ProFeatures />
    </div>
  );
}
