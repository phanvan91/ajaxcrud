<?php

namespace App\Http\Controllers;
use App\Task;
use Illuminate\Http\Request;

class AjaxCrud extends Controller
{
    public function index (){
        $tasks = Task::all();
        return view('welcome',compact('tasks'));
    }

    public function task($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task,200);
    }

    public function create(Request $request)
    {
        $task = Task::create($request->all());
        return response()->json($task,200);
    }

    public function update(Request $request,$id)
    {
        $task = Task::find($id);
        $task->update($request->all());
        return response()->json($task,200);
    }

    public function del($id)
    {
        $task = Task::destroy($id);
        return response()->json($task);
    }
}
