
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/mediumish-theme-jekyll/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/mediumish-theme-jekyll/about",
    "title": "About Me",
    "body": "Coming soon. . . LinksGitHub Profile "
    }, {
    "id": 2,
    "url": "http://localhost:4000/mediumish-theme-jekyll/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/mediumish-theme-jekyll/",
    "title": "Home",
    "body": "      Featured:                                       All Stories:                                                             How to fix VSTS API 400 Bad Request DelegatedAuthorizationException              :       Real quick, I was integrated with the VSTS (Visual Studio Team Services) API by calling https://app. vssps. visualstudio. com/oauth2/authorize, and I was getting the following::                                                                                               18 Apr 2016                                                                                            Side-loading an appx package onto Windows 10              :       I was running into a problem with Heep that only affected the deployed app in the store and not while debugging. So I wanted to side-load the appx package so. . . :                                                                                               10 Oct 2015                                                                                            Get Meetings for a Room (GetUserAvailability) EWS              :       Back again with and Exchange Web Services (EWS) post. This covered what seemed like a difficult thing to do, that is, to get a room’s availability. I did find a. . . :                                                                                               10 Oct 2015                                                                                            Creating Meetings in EWS (Exchange Web Services)              :       This last week I’ve been playing around with Exchange Web Services, and if you’ve ever had the pleasure, then you know resources are thin. So I may be making another. . . :                                                                                               10 Oct 2015                                            "
    }, {
    "id": 4,
    "url": "http://localhost:4000/mediumish-theme-jekyll/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/mediumish-theme-jekyll/bad-request-delegatedauthorizationexception/",
    "title": "How to fix VSTS API 400 Bad Request DelegatedAuthorizationException",
    "body": "2016/04/18 - Real quick, I was integrated with the VSTS (Visual Studio Team Services) API by calling https://app. vssps. visualstudio. com/oauth2/authorize, and I was getting the following: 123400 Bad Request:Exception of type ‘Microsoft. VisualStudio. Services. Web. Profile. Controllers. DelegatedAuthorizationException’ was thrown. Not a super helpful error message, but the fix was simple.  Make sure all your parameter names are spelled correctly, and that the redirect_uri parameter matches exactly what you defined when you registered your app here: https://app. vssps. visualstudio. com/app/register.  The redirect_uri that you registered and the paramater your passing in both have to be https. "
    }, {
    "id": 6,
    "url": "http://localhost:4000/mediumish-theme-jekyll/side-loading-an-appx-package/",
    "title": "Side-loading an appx package onto Windows 10",
    "body": "2015/10/10 - I was running into a problem with Heep that only affected the deployed app in the store and not while debugging. So I wanted to side-load the appx package so i could reproduce the issue, turns out it’s very easy to accomplish… First uninstall any version of your app currently on your machine if you have one. Then make sure the app has a package created, by right clicking the UWP project in Visual Studio, selecting Store &gt; Create App Packages … and follow the wizard. This will probably take a while as it may compile for many architectures. Then find your solutions folder in windows explorer, and you should see a folder called AppPackages. Open it and you’ll want to find the package’s folder you want to side-load, in my case it was called Heep_2. 0. 0. 0_Test. Once inside, there should be a file called Add-AppDevPackage, right click it and select Run with Powershell. And you should be set. "
    }, {
    "id": 7,
    "url": "http://localhost:4000/mediumish-theme-jekyll/getuseravailability/",
    "title": "Get Meetings for a Room (GetUserAvailability) EWS",
    "body": "2015/10/10 - Back again with and Exchange Web Services (EWS) post. This covered what seemed like a difficult thing to do, that is, to get a room’s availability. I did find a post for doing such a thing (link), but I think I’d like to do it differently. First, just like every other EWS call, we need to initialize the ExchangeServiceBinding. 123var Binding = new ExchangeServiceBinding(); Binding. Credentials = new NetworkCredential( UserName ,  Password ,  domain ); Binding. Url = @ https://server/EWS/exchange. asmx ;Now, this next part is where I got tripped up, I wasn’t in the mindset that a room is treated no differently than a user. As such, we can use GetUserAvailability method on our Binding. Lets get the room’s mailbox next. 123456789var mbMailbox = new MailboxData[]{  new MailboxData()  {   Email = new EmailAddress()   {     Address = Room   }  }};Now that we have the room’s mailbox, we need to build our GetUserAvailabilityRequestType object to pass to GetUserAvailability. Lets start by setting the request’s TimeZone property. 1234567891011121314151617GetUserAvailabilityRequestType fbRequest = new GetUserAvailabilityRequestType();var timeZone = new SerializableTimeZone();timeZone. DaylightTime = new SerializableTimeZoneTime();timeZone. StandardTime = new SerializableTimeZoneTime();timeZone. Bias = 360; // Central TimetimeZone. StandardTime. Bias = 0;timeZone. DaylightTime. Bias = -60;timeZone. DaylightTime. DayOfWeek =  Sunday ;timeZone. DaylightTime. DayOrder = 2;timeZone. DaylightTime. Month = 3;timeZone. DaylightTime. Time =  00:00:00 ;timeZone. StandardTime. DayOfWeek =  Sunday ;timeZone. StandardTime. DayOrder = 1;timeZone. StandardTime. Month = 11;timeZone. StandardTime. Time =  23:59:59 ;fbRequest. TimeZone = timeZone;fbRequest. MailboxDataArray = mbMailbox; // created from aboveThe post I mentioned above accessed the local machine’s registry to get the current timezone information. I just statically put it in there to lessen the confusion on the subject. Now the last thing we need to do is assign the FreeBusyViewOptions property of the request object. 12345678910Duration fbDuration = new Duration();fbDuration. StartTime = DateTime. Now;fbDuration. EndTime = DateTime. Now. AddDays(1);FreeBusyViewOptionsType fbViewOptions = new FreeBusyViewOptionsType();fbViewOptions. TimeWindow = fbDuration;fbViewOptions. RequestedView = FreeBusyViewType. DetailedMerged;fbViewOptions. RequestedViewSpecified = true;fbViewOptions. MergedFreeBusyIntervalInMinutes = 30;fbViewOptions. MergedFreeBusyIntervalInMinutesSpecified = true;fbRequest. FreeBusyViewOptions= fbViewOptions;Now all we do is pass the request object into GetUserAvailability and get the calendar events that come back: 12var response = Binding. GetUserAvailability(fbRequest);var events = response. FreeBusyResponseArray[0]. FreeBusyView. CalendarEventArray;Thats all it really takes. Just loop through the CalendarEventArray, and you can see the meetings that are taking place in that room inside the duration. "
    }, {
    "id": 8,
    "url": "http://localhost:4000/mediumish-theme-jekyll/creating-meetings-ews/",
    "title": "Creating Meetings in EWS (Exchange Web Services)",
    "body": "2015/10/10 - This last week I’ve been playing around with Exchange Web Services, and if you’ve ever had the pleasure, then you know resources are thin. So I may be making another one or two posts on the subject. Here’s how I’m able to create a meeting. First things first, you’ll need to initialize the ExchangeServiceBinding. 123var Binding = new ExchangeServiceBinding(); Binding. Credentials = new NetworkCredential( UserName ,  Password ,  domain ); Binding. Url = @ https://server/EWS/exchange. asmx ;Server in this case would be the server name of the Exchange server you’re trying to make a connection with. Next you’ll have to make the CalendarItemType with the meeting information. 1234567891011121314151617181920212223242526272829var meeting = new CalendarItemType {  Subject =  Meeting name ,  Body = new BodyType  {   Value =  CalendarItem:TextBody ,    BodyType1 = BodyTypeType. Text  },  Start = DateTime. Now,  StartSpecified = true,  End = DateTime. Now. AddHours(1),  EndSpecified = true,  MeetingTimeZone = new TimeZoneType  {    TimeZoneName = TimeZone. CurrentTimeZone. StandardName,    BaseOffset =  PT6H  // Central  },  Location =  Meeting Room Name ,  RequiredAttendees = new[]  {    new AttendeeType    {     Mailbox =new EmailAddressType     {       EmailAddress =  test@test. com      }    }  } };As far as the MeetingTimeZone goes, you’ll have to pass in your time as represented by PTXH (PT0H for utc, PT6H, etc). Location will be a string, and will not be resolved. So if you want that room to be reserved then you’ll have to add it as an attendee, along with any other attendees you want to add. Next, you’ll have to create the CreateItemType containing the recently created CalendarItemType. 12345678910111213141516171819var request = new CreateItemType {  SendMeetingInvitations = CalendarItemCreateOrDeleteOperationType. SendToAllAndSaveCopy,  SendMeetingInvitationsSpecified = true,  SavedItemFolderId = new TargetFolderIdType  {    Item = new DistinguishedFolderIdType    {     Id = DistinguishedFolderIdNameType. calendar    }  },  Items = new NonEmptyArrayOfAllItemsType  {    Items = new ItemType[]    {     meeting    }  } };Now you’re ready to make the request. 1CreateItemResponseType response = Binding. CreateItem(request);From there you’ll be able to check if the response’s first item is of type ResponseClassType. Error, and if not, then you just successfully created a meeting. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});