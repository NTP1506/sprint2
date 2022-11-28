using RookieOnlineAssetManagement.Enum;
using System;

namespace RookieOnlineAssetManagement.Entities
{
    public class ReturningRequest
    {
        public int Id { get; set; }
        public DateTime? ReturnedDate { get; set; }
        public RequestState State { get; set; }
        public User RequestedBy { get; set; }
        public User AcceptedBy { get; set; }

        public virtual Asset Asset { get; set; }

    }
}
