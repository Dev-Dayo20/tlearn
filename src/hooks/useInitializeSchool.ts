import { useEffect } from "react";
import { useSchoolStore } from "@/store/SchoolStore";

export const useInitializeSchool = () => {
  const initializeSchool = useSchoolStore((state) => state.initializeSchool);
  useEffect(() => {
    //  console.log('useInitializeSchool - calling initializeSchool');
    initializeSchool();
  }, [initializeSchool]);
};
