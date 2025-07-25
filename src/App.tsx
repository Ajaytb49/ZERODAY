@@ .. @@
 import React from 'react';
 import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
+import EventsLayout from './components/events/EventsLayout';
 
 function App() {
   return (
     <Router>
       <div className="min-h-screen bg-gray-50">
         <Routes>
-          <Route path="/" element={<Navigate to="/dashboard" replace />} />
+          <Route path="/" element={<Navigate to="/events" replace />} />
+          <Route path="/events" element={<EventsLayout />} />
           <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
       </div>
   )
 }