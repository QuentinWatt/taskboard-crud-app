<?php

namespace App\Http\Resources\v1\Boards;

use App\Http\Resources\v1\Tasks\TaskResourceCollection;
use App\Http\Resources\v1\User\UserSummaryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /**
         * An API resource can have fixed keys, so that these can be
         * fixed between versions, so that updates to the model do not
         * cause breakages to consuming web app or mobile app.
         */

        return [
            'id' => $this->id,
            'name' => $this->name,
            'user' => new UserSummaryResource($this->user),
        ];
    }
}
