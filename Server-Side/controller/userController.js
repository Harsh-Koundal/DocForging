import User from "../model/User.js";
import Activity from "../model/Activity.js";
import Document from "../model/Document.js";


// get current user
export const getCurrentUser = async (req, res, next) => {
  try {

    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "name email role storageUsed storageLimit isVerified"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        storage: {
          used: user.storageUsed,
          limit: user.storageLimit
        }
      }
    });

  } catch (err) {
    console.error("Failed to fetch current user", err);
    next(err);
  }
};

// get dashboard data 
export const getDashboardData = async (req, res, next) => {
    try {
        const userId = req.user.id;

        //user info 
        const user = await User.findById(userId).select(
            "name email role storageUsed storageLimit"
        )

        // recent documents
        const recentFiles = await Document.find({
            $or: [
                { owner: userId },
                { "collaborators.user": userId },
            ],
            isDeleted: false,
        })
            .sort({ updatedAt: -1 })
            .limit(6)
            .populate("owner", "name");

        // owned documents
        const ownedCount = await Document.countDocuments({
            owner: userId,
            isDeleted: false
        });



        // shared documents
        const sharedCount = await Document.countDocuments({
            "collaborators.user": userId
        });



        // active collaborators
        const activeNow = await Document.countDocuments({
            "collaborators.user": userId,
            type: "collab"
        });

        //recent activity
        const activity = await Activity.find({
            user: userId,
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("document", "name");


        return res.status(200).json({
            user,
            stats: {
                document: ownedCount,
                shared: sharedCount,
                active: activeNow,
            },
            recentFiles,
            activity,

            storage: {
                used: user.storageUsed,
                limit: user.storageLimit,
            },
        });
    } catch (err) {
        console.error("Dashboard error", err);
        next(err);
    }
}