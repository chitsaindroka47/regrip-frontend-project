import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useKanbanStore } from '@/store/kanbanStore';

const AddTaskInput = () => {
  const [value, setValue] = useState('');
  const addTask = useKanbanStore((s) => s.addTask);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addTask(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="flex items-center gap-2 mt-1">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
        className="flex-1 text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground/60 text-foreground"
      />
      <button
        onClick={handleAdd}
        disabled={!value.trim()}
        className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-accent disabled:opacity-30 transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default AddTaskInput;
