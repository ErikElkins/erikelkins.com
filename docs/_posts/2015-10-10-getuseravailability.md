---
layout: post
title:  "Get Meetings for a Room (GetUserAvailability) EWS"
author: erik
categories: [ EWS ]
comments: false
---

Back again with and Exchange Web Services (EWS) post. This covered what seemed like a difficult thing to do, that is, to get a room’s availability. I did find a post for doing such a thing (link), but I think I’d like to do it differently. First, just like every other EWS call, we need to initialize the `ExchangeServiceBinding`.

```csharp
var Binding = new ExchangeServiceBinding(); 
Binding.Credentials = new NetworkCredential("UserName", "Password", "domain"); 
Binding.Url = @"https://server/EWS/exchange.asmx";
```

Now, this next part is where I got tripped up, I wasn’t in the mindset that a room is treated no differently than a user. As such, we can use `GetUserAvailability` method on our Binding. Lets get the room’s mailbox next.

```csharp
var mbMailbox = new MailboxData[]{
   new MailboxData()
   {
      Email = new EmailAddress()
      {
         Address = Room
      }
   }
};
```

Now that we have the room’s mailbox, we need to build our `GetUserAvailabilityRequestType` object to pass to `GetUserAvailability`. Lets start by setting the request’s `TimeZone` property.

```csharp
GetUserAvailabilityRequestType fbRequest = new GetUserAvailabilityRequestType();
var timeZone = new SerializableTimeZone();
timeZone.DaylightTime = new SerializableTimeZoneTime()
;timeZone.StandardTime = new SerializableTimeZoneTime();
timeZone.Bias = 360; // Central 
TimetimeZone.StandardTime.Bias = 0;
timeZone.DaylightTime.Bias = -60;
timeZone.DaylightTime.DayOfWeek = "Sunday";
timeZone.DaylightTime.DayOrder = 2;
timeZone.DaylightTime.Month = 3;
timeZone.DaylightTime.Time = "00:00:00";
timeZone.StandardTime.DayOfWeek = "Sunday";
timeZone.StandardTime.DayOrder = 1;
timeZone.StandardTime.Month = 11;
timeZone.StandardTime.Time = "23:59:59";
fbRequest.TimeZone = timeZone;
fbRequest.MailboxDataArray = mbMailbox; // created from above
```

The post I mentioned above accessed the local machine’s registry to get the current timezone information. I just statically put it in there to lessen the confusion on the subject. Now the last thing we need to do is assign the `FreeBusyViewOptions` property of the request object.

```csharp
Duration fbDuration = new Duration();
fbDuration.StartTime = DateTime.Now;
fbDuration.EndTime = DateTime.Now.AddDays(1);
FreeBusyViewOptionsType fbViewOptions = new FreeBusyViewOptionsType();
fbViewOptions.TimeWindow = fbDuration;
fbViewOptions.RequestedView = FreeBusyViewType.DetailedMerged;
fbViewOptions.RequestedViewSpecified = true;
fbViewOptions.MergedFreeBusyIntervalInMinutes = 30;
fbViewOptions.MergedFreeBusyIntervalInMinutesSpecified = true;
fbRequest.FreeBusyViewOptions= fbViewOptions;
```
Now all we do is pass the request object into `GetUserAvailability` and get the calendar events that come back:

```csharp
var response = Binding.GetUserAvailability(fbRequest);
var events = response.FreeBusyResponseArray[0].FreeBusyView.CalendarEventArray;
```

Thats all it really takes. Just loop through the `CalendarEventArray`, and you can see the meetings that are taking place in that room inside the duration.