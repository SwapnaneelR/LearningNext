"use client"
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [task, settask] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      settask(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      title: title,
      description: description,
    };
    settask([...task, obj]);
    setdescription("");
    settitle("");
  };

  const deleteHandler = (i) => {
    const copytask = [...task];
    copytask.splice(i, 1);
    settask(copytask);
  };

  return (
    <div className="h-screen items-center flex flex-col w-screen bg-zinc-900">
      <HeaderComp />
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="border-yellow-400 border-2 bg-inherit m-10 px-10 py-2"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          type="text"
          className="border-yellow-400 border-2 bg-inherit m-10 px-10 py-2"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <button className="bg-yellow-400 px-4 py-3 text-zinc-100 font-semibold rounded">
          Add Task
        </button>
      </form>
      <RenderTasks />
    </div>
  );

  function HeaderComp() {
    return (
      <h1 className="text-7xl p-6 font-semibold text-center text-yellow-400">
        TodoList 🔥
      </h1>
    );
  }

  function RenderTasks() {
    return (
      <div className="flex flex-col overflow-auto gap-4 justify-between">
        {task.map((e, i) => (
          <div key={i} className="justify-between gap-10 flex flex-row">
            <h1 className="text-3xl font-semibold text-white">{e.title}</h1>
            <h2 className="text-3xl font-semibold text-yellow-300">
              {e.description}
            </h2>
            <button
              onClick={() => deleteHandler(i)}
              className="bg-red-500 rounded px-3 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default Page;
