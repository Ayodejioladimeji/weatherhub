// "use client"

// import { useSelector } from "react-redux"
// import type { RootState } from "@/lib/store"

// export const useAppSelector = (selector: (state: RootState) => any) => useSelector(selector)


"use client"

import { TypedUseSelectorHook, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

// ✅ Strongly typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
