'use client';

import { decrement, increment, incrementByAmount } from "@/store/counterSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold">Counter: {count}</h1>
          <div className="mt-4 space-x-2">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded" 
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded" 
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded" 
              onClick={() => dispatch(incrementByAmount(5))}
            >
              Increment by 5
            </button>
          </div>
        </div>
      );
}