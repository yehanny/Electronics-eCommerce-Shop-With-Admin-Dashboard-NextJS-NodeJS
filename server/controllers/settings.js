const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createSettings(request, response) {
  try {
    const { name } = request.body;
    const settings = await prisma.settings.create({
      data: {
        name,
      },
    });
    return response.status(201).json(settings);
  } catch (error) {
    console.error("Error creating settings:", error);
    return response.status(500).json({ error: "Error creating settings" });
  }
}

async function updateSettings(request, response) {
  try {
    const { id } = request.params;
    const { name } = request.body;

    const existingSettings = await prisma.settings.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingSettings) {
      return response.status(404).json({ error: "Settings not found" });
    }

    const updatedSettings = await prisma.settings.update({
      where: {
        id: existingSettings.id,
      },
      data: {
        name,
      },
    });

    return response.status(200).json(updatedSettings);
  } catch (error) {
    return response.status(500).json({ error: "Error updating settings" });
  }
}

async function deleteSettings(request, response) {
  try {
    const { id } = request.params;
    await prisma.settings.delete({
      where: {
        id: id,
      },
    });
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting settings" });
  }
}

async function getSettings(request, response) {
  // Get setting by userId from prisma.settings model

  const { userId } = request.params;

  const settings = await prisma.settings.findUnique({
    where: {
      id: userId
    },
  });

  if (!settings) {
    return response.status(404).json({ error: "Settings not found" });
  }

  return response.status(200).json(settings)
}

module.exports = {
  createSettings,
  updateSettings,
  deleteSettings,
  getSettings,
};
