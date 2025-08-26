import SelectInfo from "../pages/Selector/SelectInfo";
import { UseBlogs } from "../hooks/contex/UseContexProvider";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import Viewpoint from "../pages/viewpoint/viewpoint";

export default function Overview() {
  const { loading, error, verses } = UseBlogs();

  console.log("Verses passed to Viewpoint:", verses);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <Viewpoint
        slides={verses.length ? verses : ["Select a verse to view here."]}
      />
      <div className="bg-gray-100">
        <SelectInfo />
      </div>
    </div>
  );
}
