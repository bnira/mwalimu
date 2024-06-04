"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import PollList from './PollList';
import PollForm from './PollForm';
import PollDetail from './PollDetail';

const supabaseUrl = 'https://bhxngkcycdiluwybrhnd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeG5na2N5Y2RpbHV3eWJyaG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxMjM4OTQsImV4cCI6MjAzMjY5OTg5NH0.s3CoU5zOuYw7tkaQN3BKRUXiAA0QynIUup1ehi5DXCY';

const supabase = createClient(supabaseUrl, supabaseKey, { schema: 'public' });

const PollDashboard = () => {
  const [polls, setPolls] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = supabase.auth.getUser();
    if (user) {
      setIsLoggedIn(true);
      fetchPolls();
    }
  }, []);

  const fetchPolls = async () => {
    try {
      const { data, error } = await supabase
        .from('polls')
        .select('id, question, options');
      if (error) console.error(error);
      setPolls(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <PollList polls={polls} />
          <PollForm supabase={supabase} />
        </>
      ) : (
        <p>You must be logged in to view polls.</p>
      )}
    </div>
  );
};

export default PollDashboard;
