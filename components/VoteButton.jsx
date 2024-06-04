import React from 'react';

const VoteButton = ({ poll, options, supabase }) => {
  const handleVote = async () => {
    const { error } = await supabase
      .from('votes')
      .insert({ poll_id: ('https://bhxngkcycdiluwybrhnd.supabase.co'), options: { options } });
    if (error) console.error(error);
  };

  return (
    <button onClick={handleVote}>
      Vote for {options}
    </button>
  );
};

export default VoteButton;