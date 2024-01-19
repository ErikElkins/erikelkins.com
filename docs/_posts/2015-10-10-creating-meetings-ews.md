---
layout: post
title:  "Creating Meetings in EWS (Exchange Web Services)"
author: erik
categories: [ EWS ]
comments: false
---

This last week I’ve been playing around with Exchange Web Services, and if you’ve ever had the pleasure, then you know resources are thin. So I may be making another one or two posts on the subject. Here’s how I’m able to create a meeting. First things first, you’ll need to initialize the `ExchangeServiceBinding`.

```csharp
var Binding = new ExchangeServiceBinding(); 
Binding.Credentials = new NetworkCredential("UserName", "Password", "domain"); 
Binding.Url = @"https://server/EWS/exchange.asmx";
```

Server in this case would be the server name of the Exchange server you’re trying to make a connection with. Next you’ll have to make the `CalendarItemType` with the meeting information.

```csharp
var meeting = new CalendarItemType 
{ 
   Subject = "Meeting name", 
   Body = new BodyType 
   {
      Value = "CalendarItem:TextBody", 
      BodyType1 = BodyTypeType.Text 
   }, 
   Start = DateTime.Now, 
   StartSpecified = true, 
   End = DateTime.Now.AddHours(1), 
   EndSpecified = true, 
   MeetingTimeZone = new TimeZoneType 
   { 
      TimeZoneName = TimeZone.CurrentTimeZone.StandardName, 
      BaseOffset = "PT6H" // Central 
   }, 
   Location = "Meeting Room Name", 
   RequiredAttendees = new[] 
   { 
      new AttendeeType 
      { 
         Mailbox =new EmailAddressType 
         { 
            EmailAddress = "test@test.com" 
         } 
      } 
   } 
};
```

As far as the MeetingTimeZone goes, you’ll have to pass in your time as represented by `PTXH` (`PT0H` for utc, `PT6H`, etc). Location will be a string, and will not be resolved. So if you want that room to be reserved then you’ll have to add it as an attendee, along with any other attendees you want to add. Next, you’ll have to create the `CreateItemType` containing the recently created `CalendarItemType`.

```csharp
var request = new CreateItemType 
{ 
   SendMeetingInvitations = CalendarItemCreateOrDeleteOperationType.SendToAllAndSaveCopy, 
   SendMeetingInvitationsSpecified = true, 
   SavedItemFolderId = new TargetFolderIdType 
   { 
      Item = new DistinguishedFolderIdType 
      { 
         Id = DistinguishedFolderIdNameType.calendar 
      } 
   }, 
   Items = new NonEmptyArrayOfAllItemsType 
   { 
      Items = new ItemType[] 
      { 
         meeting 
      } 
   } 
};
```

Now you’re ready to make the request.

```csharp
CreateItemResponseType response = Binding.CreateItem(request);
```

From there you’ll be able to check if the response’s first item is of type `ResponseClassType.Error`, and if not, then you just successfully created a meeting.