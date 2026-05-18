const Project = require('../models/Project');

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = async (req, res, next) => {
  try {
    const { name, client, location, date, status, description, category, isPublished, imageUrl, caption } = req.body;
    
    let finalImageUrl = imageUrl;
    let finalCaption = caption || '';

    if (req.file) {
      finalImageUrl = req.file.path;
    }

    const project = new Project({
      name,
      client,
      location,
      date,
      status,
      description,
      category,
      isPublished: isPublished === 'true' || isPublished === true,
      image: {
        url: finalImageUrl,
        caption: finalCaption
      },
      createdBy: req.user.id
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
    
// @desc    Get all published projects (Public)
// @route   GET /api/projects
// @access  Public
exports.getAllProjects = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { client: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(query).sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured projects (Public)
// @route   GET /api/projects/featured
// @access  Public
exports.getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ isPublished: true })
      .sort({ date: -1 })
      .limit(6);
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all projects (Admin)
// @route   GET /api/projects/admin
// @access  Private/Admin
exports.getAdminProjects = async (req, res, next) => {
  try {
    const { filter, category, search, page = 1, limit = 8 } = req.query;
    let query = {};

    if (filter === 'published') {
      query.isPublished = true;
    } else if (filter === 'unpublished') {
      query.isPublished = false;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { client: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      projects,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalProjects: total
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project by id (Public)
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, isPublished: true });  
    if (!project) {
      return res.status(404).json({ message: 'Project not found or not published' });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Get project by id (Admin)
// @route   GET /api/projects/:id/admin
// @access  Private/Admin
exports.getAdminProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);  
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = async (req, res, next) => {
  try {
    const { name, client, location, date, status, description, category, isPublished, imageUrl, caption } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.name = name || project.name;
    project.client = client || project.client;
    project.location = location || project.location;
    project.date = date || project.date;
    project.status = status || project.status;
    project.description = description || project.description;
    project.category = category || project.category;
    
    if (isPublished !== undefined) {
      project.isPublished = isPublished === 'true' || isPublished === true;
    }

    if (req.file) {
      project.image.url = req.file.path;
    } else if (imageUrl !== undefined) {
      project.image.url = imageUrl;
    }
    
    if (caption !== undefined) {
      project.image.caption = caption;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
