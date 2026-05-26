import Report from "../models/report.js";

const report = async (req, res) => {
  try {
    const imageURLS = req.files.map((file) => file.path);
    const report = await Report.create({
      title: req.body.title,
      category: req.body.category,
      priority: req.body.priority,
      location: req.body.location,
      description: req.body.description,
      images: imageURLS,
      createdBy: req.user.id,
    });

    

    res.status(201).json({ message: "Report Submitted Successfully!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to save report" });
  }
};
const fetchReport = async (req, res) => {
  try {
    const reports = await Report.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    
    res.status(200).json({ message: "Reports fetched successfully!", reports });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching reports..." });
  }
};

const fetchAllReport = async (req, res) => {
  try {
    const reports = await Report.find({
      createdBy: { $ne: req.user.id },
    })
      .populate("createdBy", "name avatar userName profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Reports fetched successfully!", reports });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching reports..." });
  }
};

const updateReport = async (req, res) => {
  try {
    const { title, description, location, priority, status } = req.body;
    const id = req.params.id;

    const updatedReport = await Report.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Report updated Successfully!", updatedReport });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server error! Please try again later..." });
  }
};

const deleteReport = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(400).json({ message: "Report not found!" });
    } else {
      res.status(200).json({ message: "Report deleted successfully  !" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error! Try again later..." });
  }
};

const likeReport = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found!" });
    }

    const likedUser = report.like.includes(userId);

    const updateLike = await Report.findByIdAndUpdate(
      id,
      likedUser ? { $pull: { like: userId } } : { $addToSet: { like: userId } },
      { new: true },
    );

    res.status(200).json({
      liked: !likedUser,
      count: updateLike.like.length,
      message: likedUser ? "Unliking" : "Liking",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during confirmation!" });
  }
};

const fetchOverallReports=async(req,res)=>{
  try {
    const overallReports= await Report.find({}, {status:1})
    if(overallReports.length==0){
      res.status(400).json({message:"No reports found!!"})
      return
    }
    res.status(200).json({overallReports})

  } catch (error) {
    console.log(error)
    res.status(500).json({message:"server error"})
  }
}


export {
  report,
  fetchReport,
  fetchAllReport,
  updateReport,
  deleteReport,
  likeReport,
  fetchOverallReports
};
