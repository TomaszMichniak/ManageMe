import { StoryService } from "../service/storyService";
import { Story } from "../types/storyType";
import { useLocation } from "react-router-dom";
import StoryForm from "./form/storyForm";
import { Status } from "../types/enums/statusEnum";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../service/userService";
import { ProjectService } from "../service/projectService";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { notificationService } from "../service/notificationService";
import { Priority } from "../types/enums/priorityEnum";
export default function StoryList() {
  const user = useLoggedInUser();
  let { projectId } = useParams<{ projectId: string }>();
  if (projectId === undefined) {
    throw new Error("undefined Parms");
  }
  const projectIdNumber = Math.abs(parseInt(projectId));
  const location = useLocation();
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [stories, setStories] = useState<Story[] | null>(null);
  const [editingProject, setEditingProject] = useState<Story | null>(null);
  const project = ProjectService.getProjectById(projectIdNumber);
  useEffect(() => {
    (async () => {
      getSetStory();
    })();
  }, [selectedStatus]);
  const getSetStory = async () => {
    if (selectedStatus == null) {
      const data = await StoryService.getStoriesByProjectId(projectIdNumber);
      setStories(data);
    } else {
      let data = await StoryService.getStoriesByProjectId(projectIdNumber);
      data = data.filter((item) => item.status == selectedStatus);
      setStories(data);
    }
  };
  const handleEdit = async (storyId: number) => {
    let project = await StoryService.getStoryById(storyId);
    setEditingProject(project!);
  };
  const handleEditProject = async (editStory: Story) => {
    StoryService.updateStory(editStory);
    const notification = notificationService.createNotification(
      "Story edited",
      `Story with name: ${editStory.name} was edited!`,
      Priority.low
    );
    notificationService.send(notification);
    getSetStory();
    setEditingProject(null);
  };
  const handleCreateNewStory = async (newStory: Story) => {
    StoryService.addStory(newStory);
    const notification = notificationService.createNotification(
      "Story created",
      `Story with name: ${newStory.name} was created!`,
      Priority.low
    );
    notificationService.send(notification);
    getSetStory();

    setCreateMode(false);
  };
  const handleDelete = async (storyId: number) => {
    const story = StoryService.getStoryById(storyId);
    StoryService.deleteStory(storyId);
    const notification = notificationService.createNotification(
      "Story removed",
      `${story?.name} was removed!`,
      Priority.high
    );
    notificationService.send(notification);
    getSetStory();
  };
  const handleCreate = () => {
    setCreateMode(!createMode);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(e.target.value as Status);
    }
  };

  return (
    <div className="">
      <p className="text-center font-bold text-4xl text-white uppercase">
        {project?.name}
      </p>
      <div className="text-right mx-5  my-2">
        <label className="text-white">Sort: </label>
        <select
          className="my-1 shadow bg-white border rounded-lg  py-2 px-4 mr-4"
          id="status"
          onChange={handleSelectChange}
        >
          <option key={"all"} value={"all"}>
            All
          </option>
          {Object.values(Status).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCreate()}
        >
          Add
        </button>
        <p className="text-center text-xl text-white">Stories:</p>
      </div>
      <div className="flex flex-wrap    justify-center items-center items-stretch ">
        {stories?.map((story) => (
          <div
            key={story.id}
            className="bg-white basis-10/12 sm:basis-1/3 lg:basis-1/4  dark:bg-gray-400 m-1 p-5"
          >
            <div>
              <p className="py-1">Nazwa: {story.name}</p>
              <p className="py-1">Opis: {story.description}</p>
              <p className="py-1">Priorytet: {story.priority}</p>
              <p className="py-1">Utworzono: {story.createDate}</p>
              <p className="py-1">Status: {story.status}</p>
              <p className="py-1">
                Właściciel: {UserService.getUserName(story.userId)}
              </p>
            </div>
            <div className="text-center ">
              <Link
                className="w-full text-white dark:text-black bg-gradient-to-r from-cyan-400 to-blue-600 my-1 dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-400 block text-center  font-bold py-2 px-2 rounded"
                to={`${location.pathname}/story/${story.id}`}
              >
                Tasks
              </Link>
              <button
                className=" my-1 mx-5  "
                onClick={() => handleEdit(story.id)}
              >
                <img src="/icons/editIcon.svg" alt="Delete" className="w-7 " />
              </button>
              <button
                className=" my-1 mx-5 basis-1/2 "
                onClick={() => handleDelete(story.id)}
              >
                <img src="/icons/binIcon.svg" alt="Delete" className="w-7  " />
              </button>
            </div>
          </div>
        ))}
      </div>
      {createMode && (
        <StoryForm
          handleCloseCreateMenu={() => setCreateMode(false)}
          handleCreate={handleCreateNewStory}
          projectId={projectIdNumber}
          userId={user?.userid}
        />
      )}
      {editingProject && (
        <StoryForm
          story={editingProject}
          handleCloseCreateMenu={() => setEditingProject(null)}
          handleCreate={handleEditProject}
          projectId={projectIdNumber}
          userId={user?.userid}
        />
      )}
    </div>
  );
}
