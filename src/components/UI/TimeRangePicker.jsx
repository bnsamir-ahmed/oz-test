import React, { useState } from 'react';
import { PickTime } from 'react-pick-time-range';

const TimeRangePicker = () => {

   
    return (
        <>
            <PickTime
              onError={(error, timings) => {
                console.log('On Error', error, timings)
              }}
              onSave={(timings) => {
                console.log('Data', timings)
              }}
              onSlotsFilled={() => {
                alert('All slots are filled')
              }}
              scheduledTimings={[
                ['01:00', '01:30'],
                ['17:30', '18:00'],
              ]}
              timeFrame={30}
              showAddButton={false}
                showSubmitButton={false}
            />
        </>
    );
};
export default TimeRangePicker;