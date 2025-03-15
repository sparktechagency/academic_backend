import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { eventService } from './event.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Event
const createevent = catchAsync(async (req: Request, res: Response) => {
  req.body.userId = req?.user?.userId;
  const eventData = req.body;
  const newEvent = await eventService.createevent(eventData);
  res.status(201).json({
    status: 'success',
    data: newEvent,
  });
});

// Get All Events
const getAllevent = catchAsync(async (req: Request, res: Response) => {
  const events = await eventService.getAllevent(req.query);
  res.status(200).json({
    status: 'success',
    data: events,
  });
});

// Get Event by ID
const geteventById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await eventService.geteventById(id, req.query);
  if (!event) {
    return res.status(404).json({
      status: 'fail',
      message: 'Event not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
});

// Get Event by ID
const getMyeventById = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userId;
  const event = await eventService.getMyeventById(id, req.query);
  if (!event) {
    return res.status(404).json({
      status: 'fail',
      message: 'Event not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
});

// Update Event
const updateevent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventData = req.body;
  const updatedEvent = await eventService.updateevent(id, eventData);
  if (!updatedEvent) {
    return res.status(404).json({
      status: 'fail',
      message: 'Event not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: updatedEvent,
  });
});

// Delete Event
const deleteevent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedEvent = await eventService.deleteevent(id);
  if (!deletedEvent) {
    return res.status(404).json({
      status: 'fail',
      message: 'Event not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
    data: deletedEvent,
  });
});

const getEventByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const event = await eventService.getEventByUserId(userId, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully',
    data: event,
  });
});

export const eventController = {
  createevent,
  getAllevent,
  geteventById,
  updateevent,
  deleteevent,
  getMyeventById,
  getEventByUserId,
};
